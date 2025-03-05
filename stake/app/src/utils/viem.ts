import { baseSepolia } from "viem/chains";
import { PublicClient, createPublicClient, http } from 'viem';

export const viemClients = (chainId: number): PublicClient => {
  const clients: Record<string, PublicClient> = {
    [baseSepolia.id.toString()]: createPublicClient({
      chain: baseSepolia,
      transport: http('https://sepolia.base.org')
    }) as PublicClient
  };

  if (!clients[chainId.toString()]) {
    throw new Error(`No client found for chainId: ${chainId}`);
  }

  return clients[chainId.toString()];
};