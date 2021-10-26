import { Injectable } from '@nestjs/common';
import Big from 'big.js';
import Web3 from 'web3';
import type { Contract } from 'web3-eth-contract';

import type { IContract } from '../../common/constants/blockchain-network';
import {
  CONTRACT_TOKEN,
  CONTRACT_TOKEN_MAINET,
  mainnet,
  PANCAKE_ROUTE,
} from '../../common/constants/blockchain-network';
import { ApiConfigService } from './api-config.service';

const { BUSD } = CONTRACT_TOKEN_MAINET;

interface IHavesResult {
  transactionHash: string;
  blockNumber: string;
  events: {
    VaultHarvested: {
      returnValues: {
        poolReceivedAmount: string;
        goenReceivedAmount: string;
      };
    };
  };
}

// receipt.events.VaultHarvested.returnValues

@Injectable()
export class Web3Service {
  private readonly web3: Web3;

  private readonly web3Mainet: Web3;

  private readonly address: string;

  constructor(public configService: ApiConfigService) {
    this.web3Mainet = new Web3(mainnet.rpcUrls[0]);
    this.web3 = new Web3(configService.BSC.rpcUrls[0]);
    this.web3.eth.accounts.wallet.add(configService.privateKeyWallet);
    this.address = this.web3.eth.accounts.wallet[0].address;
  }

  getContract(contractConfig: IContract): Contract {
    return new this.web3.eth.Contract(
      contractConfig.contractAbi,
      contractConfig.contractAddress,
    );
  }

  async getTimestampOfBlock(block: string): Promise<string | number> {
    const blockReceipt = await this.web3.eth.getBlock(block);

    return blockReceipt.timestamp;
  }

  async getPrice(token: string): Promise<Big> {
    try {
      const contract = new this.web3Mainet.eth.Contract(
        PANCAKE_ROUTE.contractAbi,
        PANCAKE_ROUTE.contractAddress,
      );
      const [amount, value] = await contract.methods
        .getAmountsOut((10e18).toString(), [token, BUSD])
        .call();

      return Big(value).div(Big(amount));
    } catch {
      return Big(0);
    }
  }

  // function for contract market
  async harvest(contractConfig: IContract): Promise<IHavesResult> {
    const contract = this.getContract(contractConfig);
    const estimateGas = await contract.methods
      .harvest()
      .estimateGas({ from: this.address });

    // eslint-disable-next-line no-return-await
    return await contract.methods
      .harvest()
      .send({ from: this.address, gas: estimateGas * 2 });
  }

  // function for contract goen distributor
  async setGoenPrice(price: string): Promise<void> {
    const contract = this.getContract(CONTRACT_TOKEN.GOEN_DISTRIBUTOR);
    const estimateGas = await contract.methods
      .setGoenPrice(price)
      .estimateGas({ from: this.address });
    await contract.methods
      .setGoenPrice(price)
      .send({ from: this.address, gas: estimateGas * 2 });
  }
}
