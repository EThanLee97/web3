import { formatEther } from 'viem'
import { useReadContract } from 'wagmi'
import useBaseChain from './useBaseChain'
import { stakeContractConfig } from '../libs/config'
import { IAddress } from '../type/IAddress'

const useGetStakingBalance = (pid: number, address?: IAddress) => {
  const baseChain = useBaseChain()
  const { data, isPending, isSuccess, isError, error, refetch } = useReadContract({
    ...stakeContractConfig,
    functionName: 'stakingBalance',
    args: [pid, address],
    chainId: Number(baseChain),
    query: {
        enabled: !!address
    }
  })

  return {
    data: data ? Number(formatEther(data as bigint)) : 0,
    isLoading: isPending,
    isSuccess,
    isError,
    errorMessage: error?.shortMessage,
    refetch,
  }
}

export default useGetStakingBalance
