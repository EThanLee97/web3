import { useMemo } from 'react'

import { parseEther } from 'viem'
import { BaseError, useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import useBaseChain from './useBaseChain'
import useSwitchChain from './useSwitchChain'
import { stakeContractConfig } from '../libs/config'


const useDepostitEth = () => {
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
    isLoading: isDepostitPending,
    isSuccess: isDepostitSuccess,
    isError: isDepostitError,
    error: depostitError,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const isLoading = useMemo(() => {
    return isWritePending || isDepostitPending
  }, [isWritePending, isDepostitPending])

  const isError = useMemo(() => {
    return isWriteError || isDepostitError
  }, [isWriteError, isDepostitError])

  const errorMessage = useMemo(() => {
    const writeErr = writeError as BaseError
    const mintErr = depostitError as BaseError
    console.log("depostitError", writeErr)
    console.log("depostitError", depostitError)
    return writeErr?.shortMessage || mintErr?.shortMessage
  }, [writeError, depostitError])

  // if depostit nft amount is tokenId
  const depostitToken = async (amount: string) => {
    console.log('🚀 ~ depostitToken ~ amountStr:', amount)
    withSwitchChain(
      () =>
        writeContract({
          ...stakeContractConfig,
          functionName: 'depositETH',
          chainId: Number(chainId),
          args: [],
          value: parseEther(amount) ,
        }),
      Number(chainId) !== Number(baseChain) ? baseChain : baseChain
    )
  }

  return {
    depostitToken,
    isLoading,
    isError,
    errorMessage,
    isSuccess: isDepostitSuccess,
  }
}

export default useDepostitEth
