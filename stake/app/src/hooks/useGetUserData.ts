import { useReadContracts } from 'wagmi'
import useBaseChain from './useBaseChain'
import { stakeContractConfig } from '../libs/config'
import { IAddress } from '../type/IAddress'
import { useMemo } from 'react'
import { InitData } from '../app/withdraw/page'
import { formatEther } from 'viem'

const useGetUserData = (pid: number, address?: IAddress) => {
  const baseChain = useBaseChain()
  const { data, isPending, isSuccess, isError, error, refetch } = useReadContracts({
    contracts: [
        {
            ...stakeContractConfig,
            functionName: 'stakingBalance',
            args: [pid, address],
            chainId: Number(baseChain),
        },
        {
            ...stakeContractConfig,
            functionName: 'withdrawAmount',
            args: [pid, address],
            chainId: Number(baseChain),
        }
    ],
    query: {
        enabled: !!address
    }
  })
  const  userData = useMemo(()=> {
    if(isSuccess && data){
        return {
            staked: data?.[0]?.result ? formatEther(data?.[0]?.result as bigint): '0' ,
            withdrawPending:Array.isArray(data?.[1]?.result) && data?.[1]?.result.length > 0 ?
            (Number(formatEther(data?.[1]?.result?.[0])) - Number(formatEther(data?.[1]?.result?.[1]))).toFixed(4)  : '0',
            withdrawable: Array.isArray(data?.[1]?.result) && data?.[1]?.result.length > 0 ?
            formatEther(data?.[1]?.result?.[1]) : '0',
        }
    }
    return InitData
  }, [isSuccess, data])
  return {
    userData: userData,
    isLoading: isPending,
    isSuccess,
    isError,
    errorMessage: error,
    refetch,
  }
}

export default useGetUserData
