import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  baseSepolia,
} from 'wagmi/chains';
export const defaultChainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID as unknown as number
export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: '183304714857994b18a7ac9bd6f679ff',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [baseSepolia] : []),
  ],
  ssr: true,
});
