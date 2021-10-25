import Big from 'big.js';
import Web3 from 'web3';
import type { Contract } from 'web3-eth-contract';

import type { IContract } from '../constants/blockchain-network';
import {
  BSC,
  CONTRACT_TOKEN_MAINET,
  mainnet,
  PANCAKE_ROUTE,
} from '../constants/blockchain-network';

const { BUSD } = CONTRACT_TOKEN_MAINET;

const web3 = new Web3(BSC.rpcUrls[0]);

export const getContract = (contractConfig: IContract): Contract =>
  new web3.eth.Contract(
    contractConfig.contractAbi,
    contractConfig.contractAddress,
  );

export const getPrice = async (token: string): Promise<Big> => {
  try {
    const [rpcUrl] = mainnet.rpcUrls;
    const contract = new new Web3(rpcUrl).eth.Contract(
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
};
