import { useMemo } from "react";

const baseSepolia= process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as number;
const useBaseChain = () => {
  return useMemo(() => {
    return baseSepolia 
  }, [])
}
export default useBaseChain