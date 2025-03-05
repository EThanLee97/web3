import { useCallback } from 'react'

import { useAccount, useSwitchChain as useWagmiSwitchChain } from 'wagmi'
import useBaseChain from './useBaseChain'



const useSwitchChain = () => {
  const { chainId } = useAccount()
  // const algChain = useAlgChain()
  const { switchChainAsync, switchChain: switchChainWagmi } = useWagmiSwitchChain()
  const baseChain = useBaseChain()

  const withSwitchChain = useCallback(
    async (fn: any, switchChainId: number = baseChain) => {
      if (Number(chainId) !== Number(switchChainId)) {
        await switchChainAsync({ chainId: Number(switchChainId) })
      }
      return fn()
    },
    [baseChain, chainId, switchChainAsync]
  )

  const switchChain = (chainId: number) => {
    return switchChainWagmi({ chainId })
  }

  return {
    withSwitchChain,
    switchChain,
  }
}

export default useSwitchChain
