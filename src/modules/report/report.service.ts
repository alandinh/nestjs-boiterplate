import { Injectable } from '@nestjs/common';
import Big from 'big.js';

import {
  CONTRACT_STAKING,
  CONTRACT_TOKEN_MAINET,
} from '../../common/constants/blockchain-network';
import { Web3Service } from '../../shared/services/web3.service';
import { ReportRepository } from './report.repository';

const { ETH, WBNB, BTCB } = CONTRACT_TOKEN_MAINET;

const { BNB_BUSD, BTCB_BUSD, ETH_BUSD } = CONTRACT_STAKING;

export interface IReport {
  goenMarketCap: string;
  goenMonthlyprofit: string;
}

@Injectable()
export class ReportService {
  constructor(
    public readonly reportRepository: ReportRepository,
    public readonly web3Service: Web3Service,
  ) {}

  /**
   * Find single user
   */
  async getPriceBUSD(): Promise<IReport> {
    const $match = {
      blockTime: { $gte: Math.round(Date.now() / 1e3) - 30 * 24 * 60 * 60 },
    };
    const response = await this.reportRepository
      .aggregate([
        { $match },
        {
          $group: {
            _id: '$contractAddress',
            tokenAmount: { $sum: '$tokenAmount' },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const responseGoen = await this.reportRepository
      .aggregate([
        { $match },
        {
          $group: {
            _id: undefined,
            goenAmount: { $sum: '$goenAmount' },
          },
        },
      ])
      .toArray();

    const [priceETH, priceWBNB, priceBTCB] = await Promise.all(
      [ETH, WBNB, BTCB].map((token) => this.web3Service.getPrice(token)),
    );
    let goenMonthlyprofit = Big(
      responseGoen[0] ? responseGoen[0].goenAmount.toString() : 0,
    );

    for (const contract of response) {
      const tokenAmount = Big(contract.tokenAmount.toString());

      switch (contract._id) {
        case BNB_BUSD.contractAddress.toLowerCase(): {
          goenMonthlyprofit = goenMonthlyprofit.add(tokenAmount.mul(priceWBNB));
          break;
        }

        case BTCB_BUSD.contractAddress.toLowerCase(): {
          goenMonthlyprofit = goenMonthlyprofit.add(tokenAmount.mul(priceBTCB));
          break;
        }

        case ETH_BUSD.contractAddress.toLowerCase(): {
          goenMonthlyprofit = goenMonthlyprofit.add(tokenAmount.mul(priceETH));
          break;
        }
      }
    }

    return {
      goenMarketCap: goenMonthlyprofit.toFixed(),
      goenMonthlyprofit: '0',
    };
  }
}
