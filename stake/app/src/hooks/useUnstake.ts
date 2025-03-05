import { useMemo } from 'react'

import { parseEther } from 'viem'
import { BaseError, useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import useBaseChain from './useBaseChain'
import useSwitchChain from './useSwitchChain'
import { stakeContractConfig } from '../libs/config'


const useUnstake = () => {
  const { withSwitchChain } = useSwitchChain()
  const { chainId } = useAccount()
  const baseChain = useBaseChain()
  const {
    data: hash,
    isPending: isWritePending,
    isError: isWriteError,
    error: writeError,
    writeContract,
  } = useWriteContract()

  const {
    isLoading: isunstakePending,
    isSuccess: isunstakeSuccess,
    isError: isunstakeError,
    error: unstakeError,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const isLoading = useMemo(() => {
    return isWritePending || isunstakePending
  }, [isWritePending, isunstakePending])

  const isError = useMemo(() => {
    return isWriteError || isunstakeError
  }, [isWriteError, isunstakeError])

  const errorMessage = useMemo(() => {
    const writeErr = writeError as BaseError
    const mintErr = unstakeError as BaseError
    console.log("unstakeError", writeErr)
    console.log("unstakeError", unstakeError)
    return writeErr?.shortMessage || mintErr?.shortMessage
  }, [writeError, unstakeError])

  // if unstake nft amount is tokenId
  const unstakeToken = async (pid: number, amount: string) => {
    console.log('🚀 ~ unstakeToken ~ amountStr:', amount)
    withSwitchChain(
      () =>
        writeContract({
          ...stakeContractConfig,
          functionName: 'unstake',
          chainId: Number(chainId),
          args: [pid, parseEther(amount)],
        }),
      Number(chainId) !== Number(baseChain) ? baseChain : baseChain
    )
  }

  return {
    unstakeToken,
    isLoading,
    isError,
    errorMessage,
    isSuccess: isunstakeSuccess,
  }
}

export default useUnstake
