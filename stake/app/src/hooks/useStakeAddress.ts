import { useMemo } from "react";
import { IAddress } from "../type/IAddress";

const stakeAddress= process.env.NEXT_PUBLIC_STAKE_ADDRESS as unknown as IAddress;
const useStakeAddress = () => {
  return useMemo(() => {
    return stakeAddress 
  }, [])
}
export default useStakeAddress