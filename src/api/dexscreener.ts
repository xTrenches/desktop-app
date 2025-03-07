import { queryOptions } from "@tanstack/react-query";

interface Link {
  type: string;
  label: string;
  url: string;
}

export interface TokenProfile {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string;
  description: string;
  links: Link[];
}

export async function getTokenProfiles(): Promise<TokenProfile[]> {
  const response = await fetch("https://api.dexscreener.com/token-profiles/latest/v1", {
    method: "GET",
  });

  return response.json();
}

export function tokenProfilesQueryOptions() {
  return queryOptions({
    queryKey: ["token-profiles"],
    queryFn: () => getTokenProfiles(),
    // refetchInterval: 3000,
  });
}

export interface TokenPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  priceNative: string;
  priceUsd: string;
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
  labels: string[];
  volume: Record<string, number>;
  priceChange: Record<string, number>;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  boosts: { active: number };
  txns: Record<string, { buys: number; sells: number }>;
  info: {
    imageUrl: string;
    websites: { url: string }[];
    socials: { platform: string; handle: string }[];
  };
}

export async function getTokenPairs(chainId: string, tokenAddresses: string[]): Promise<TokenPair[]> {
  const response = await fetch(`https://api.dexscreener.com/tokens/v1/${chainId}/${tokenAddresses}`, {
    method: "GET",
  });

  return response.json();
}
