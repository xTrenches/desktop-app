// https://pumpportal.fun/data-api/real-time

// https://advanced-api-v2.pump.fun/coins/list?sortBy=creationTime

export interface Holder {
  holderId: string;
  ownedPercentage: number;
  realizedPnL: number;
  totalCostOfTokensHeld: number;
  totalTokenAmountHeld: number;
  isSniper: boolean;
  unrealizedPnL: number;
}

export interface CoinsListItem {
  coinMint: string;
  dev: string;
  name: string;
  ticker: string;
  imageUrl: string;
  creationTime: number;
  numHolders: number;
  marketCap: number;
  volume: number;
  bondingCurveProgress: number;
  sniperCount: number;
  currentMarketPrice: number;
  holders: Holder[];
}

export interface GetCoinsListParams {
  sortBy?: string;
}

export function getCoinsList(searchParams?: GetCoinsListParams): Promise<CoinsListItem[]> {
  const targetUrl = new URL("/coins/list", "https://advanced-api-v2.pump.fun");

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      targetUrl.searchParams.set(key, value);
    });
  }

  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl.toString())}`;

  return fetch(proxyUrl)
    .then((res) => res.json())
    .then((data) => JSON.parse(data.contents));
}
