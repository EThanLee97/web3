import { Abi } from 'viem';
import { IAddress } from '../../type/IAddress';
import StakeAbi from '../abi/StakeAbi.json';

const stakeAddress = process.env
  .NEXT_PUBLIC_STAKE_ADDRESS as unknown as IAddress;
const defaultChainId = process.env
  .NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as number;

const stakeContractConfig = {
  address: stakeAddress as IAddress,
  abi: StakeAbi as Abi,
  chainId: defaultChainId,
} as const;

export { stakeContractConfig };
