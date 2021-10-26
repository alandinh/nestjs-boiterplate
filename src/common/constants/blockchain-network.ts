export const mainnet = {
  chainName: 'Binance Smart Chain Mainnet',
  chainId: '0x38',
  rpcUrls: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.binance.org',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed3.defibit.io',
    'https://bsc-dataseed4.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed2.ninicoin.io',
    'https://bsc-dataseed3.ninicoin.io',
    'https://bsc-dataseed4.ninicoin.io',
    'wss://bsc-ws-node.nariox.org',
  ],
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrls: ['https://bscscan.com'],
};

export const testnet = {
  chainName: 'Binance Smart Chain Testnet',
  chainId: '0x61',
  rpcUrls: [
    // 'https://data-seed-prebsc-1-s1.binance.org:8545',
    'https://data-seed-prebsc-2-s1.binance.org:8545',
    'https://data-seed-prebsc-1-s2.binance.org:8545',
    'https://data-seed-prebsc-2-s2.binance.org:8545',
    'https://data-seed-prebsc-1-s3.binance.org:8545',
    'https://data-seed-prebsc-2-s3.binance.org:8545',
  ],
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrls: ['https://testnet.bscscan.com'],
};

export interface IContract {
  contractAddress: string;
  contractAbi: AbiItem[];
}

import type { AbiItem } from 'web3-utils';

import bep20Abi from './abi/bep-20.json';
import contractDistributorAbi from './abi/goen-distributor.json';
import pancakeRouterV2Abi from './abi/pancake-router-v2.json';
import vaultBusdAbi from './abi/vault-venus-busd.json';

export const CONTRACT_STAKING = {
  BNB_BUSD: {
    contractAddress: '0xfd0aF2a05d80B67Cb0FA0413F7Ce9942ECE7F644',
    contractAbi: vaultBusdAbi as AbiItem[],
  },
  ETH_BUSD: {
    contractAddress: '0x9d7890e2B2FC61DC87BE4fE9033d28D99D2D53C2',
    contractAbi: vaultBusdAbi as AbiItem[],
  },
  BTCB_BUSD: {
    contractAddress: '0x078538D00404f9548a36Ca8E9aC007EbFe4CF9f5',
    contractAbi: vaultBusdAbi as AbiItem[],
  },
};

export const CONTRACT_TOKEN = {
  BUSD: {
    contractAddress: '0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47',
    contractAbi: bep20Abi as AbiItem[],
  },
  ETH: {
    contractAddress: '0x4fac0386c4045b52756b206db3148201e42b3f62',
    contractAbi: bep20Abi as AbiItem[],
  },
  BTCB: {
    contractAddress: '0x0680E09DB938a1aFe3A55685916cdc3d13656Cde',
    contractAbi: bep20Abi as AbiItem[],
  },
  GOEN: {
    contractAddress: '0x737c92d52f0Ab5527c299e2201AaA20980Cb5ACe',
    contractAbi: bep20Abi as AbiItem[],
  },
  GOEN_BNB_LP: {
    contractAddress: '0x28004574c16e1244568c844833f532859f09137d',
    contractAbi: bep20Abi as AbiItem[],
  },
  GOEN_DISTRIBUTOR: {
    contractAddress: '0x5Db6876942664e9536b7272Bf2c161f10a82910e',
    contractAbi: contractDistributorAbi as AbiItem[],
  },
};

export const PANCAKE_ROUTE = {
  contractAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  contractAbi: pancakeRouterV2Abi as AbiItem[],
};

export const CONTRACT_TOKEN_MAINET = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  ETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  BTCB: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
};
