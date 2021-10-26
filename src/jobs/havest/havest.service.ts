import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Decimal128 } from 'bson';
import { fromWei } from 'web3-utils';

import type { IContract } from '../../common/constants/blockchain-network';
import { CONTRACT_STAKING } from '../../common/constants/blockchain-network';
import { ReportEntity } from '../../modules/report/report.entity';
import { ReportRepository } from '../../modules/report/report.repository';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { Web3Service } from '../../shared/services/web3.service';

@Injectable()
export class AutoHavestService {
  constructor(
    public readonly reportRepository: ReportRepository,
    public readonly web3Service: Web3Service,
    public configService: ApiConfigService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async handleCron(): Promise<void> {
    try {
      await this.web3Service.setGoenPrice((5e18).toString());
      const promise = [Object.values(CONTRACT_STAKING)[0]].map(
        (contractConfig) => this.havestAndStoreDatabase(contractConfig),
      );
      await Promise.all(promise);
    } catch {
      /* empty */
    }
  }

  async havestAndStoreDatabase(contractConfig: IContract): Promise<void> {
    try {
      const receipt = await this.web3Service.harvest(contractConfig);

      if (receipt?.events?.VaultHarvested?.returnValues) {
        const { transactionHash, blockNumber, events } = receipt;
        const { poolReceivedAmount, goenReceivedAmount } =
          events.VaultHarvested.returnValues;
        const blockTime = await this.web3Service.getTimestampOfBlock(
          blockNumber,
        );
        const reportEntity = new ReportEntity();
        reportEntity.transactionHash = transactionHash.trim().toLowerCase();
        reportEntity.contractAddress = contractConfig.contractAddress
          .trim()
          .toLowerCase();
        reportEntity.tokenAmount = Decimal128.fromString(
          fromWei(poolReceivedAmount),
        );
        reportEntity.goenAmount = Decimal128.fromString(
          fromWei(goenReceivedAmount),
        );
        reportEntity.blockTime = blockTime as number;

        await this.reportRepository.save(reportEntity);
      }
    } catch {
      /* empty */
    }
  }
}
