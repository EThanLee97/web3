import { useMemo } from 'react'

import { BaseError, useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import useBaseChain from './useBaseChain'
import useSwitchChain from './useSwitchChain'
import { stakeContractConfig } from '../libs/config'


const useWithDraw = () => {
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
    isLoading: iswithdrawPending,
    isSuccess: iswithdrawSuccess,
    isError: iswithdrawError,
    error: withdrawError,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const isLoading = useMemo(() => {
    return isWritePending || iswithdrawPending
  }, [isWritePending, iswithdrawPending])

  const isError = useMemo(() => {
    return isWriteError || iswithdrawError
  }, [isWriteError, iswithdrawError])

  const errorMessage = useMemo(() => {
    const writeErr = writeError as BaseError
    const mintErr = withdrawError as BaseError
    console.log("withdrawError", writeErr)
    console.log("withdrawError", withdrawError)
    return writeErr?.shortMessage || mintErr?.shortMessage
  }, [writeError, withdrawError])

  // if withdraw nft amount is tokenId
  const withdrawToken = async (pid:number) => {
    withSwitchChain(
      () =>
        writeContract({
          ...stakeContractConfig,
          functionName: 'withdraw',
          chainId: Number(chainId),
          args: [pid],
        }),
      Number(chainId) !== Number(baseChain) ? baseChain : baseChain
    )
  }

  return {
    withdrawToken,
    isLoading,
    isError,
    errorMessage,
    isSuccess: iswithdrawSuccess,
  }
}

export default useWithDraw
