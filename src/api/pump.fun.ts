// https://pumpportal.fun/data-api/real-time

export interface Holder {
  holderId: string;
  ownedPercentage: number;
  realizedPnL: number;
  totalCostOfTokensHeld: number;
  totalTokenAmountHeld: number;
  isSniper: boolean;
  unrealizedPnL: number;
}

export interface Coin {
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
}

export interface Trade {
  signature: string;
  mint: string;
  sol_amount: number;
  token_amount: number;
  is_buy: boolean;
  user: string;
  timestamp: number;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  hidden: null;
  tx_index: number;
  slot: number;
}

export interface CoinsListItem extends Coin {
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

export interface AboutToGraduateCoin extends Coin {}

export function getAboutToGraduateCoins(): Promise<AboutToGraduateCoin[]> {
  const targetUrl = new URL("/coins/about-to-graduate", "https://advanced-api-v2.pump.fun");

  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl.toString())}`;

  return fetch(proxyUrl)
    .then((res) => res.json())
    .then((data) => JSON.parse(data.contents));
}

export interface FeaturedCoin extends Coin {
  holders: Holder[];
}

export function getFeaturedCoins(): Promise<FeaturedCoin[]> {
  const targetUrl = new URL("/coins/featured", "https://advanced-api-v2.pump.fun");

  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl.toString())}`;

  return fetch(proxyUrl)
    .then((res) => res.json())
    .then((data) => JSON.parse(data.contents));
}

export interface CoinMetadata extends Pick<Coin, "dev" | "name" | "ticker" | "imageUrl"> {
  marketcap: string;
  volume: string;
  num_holders: string;
  progress: string;
  creation_time: string;
  current_market_price: string;
  sniper_count: string;
}

export interface CoinMetadataAndTrades {
  coin: CoinMetadata;
  trades: Record<string, Trade[]>;
}

export function getCoinMetadataAndTrades(mint: string): Promise<CoinMetadataAndTrades> {
  const targetUrl = new URL(`/coins/metadata-and-trades/${mint}`, "https://advanced-api-v2.pump.fun");

  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl.toString())}`;

  return fetch(proxyUrl)
    .then((res) => res.json())
    .then((data) => JSON.parse(data.contents));
}
// wss://frontend-api-v3.pump.fun/socket.io/?EIO=4&transport=websocket
export interface TradeCreatedEventData {
  signature: string;
  sol_amount: number;
  token_amount: number;
  is_buy: boolean;
  user: string;
  timestamp: number;
  mint: string;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  slot: number;
  tx_index: number;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  video_uri: null;
  metadata_uri: string;
  twitter: null;
  telegram: null;
  bonding_curve: string;
  associated_bonding_curve: string;
  creator: string;
  created_timestamp: number;
  raydium_pool: null;
  complete: boolean;
  total_supply: number;
  website: null;
  show_name: boolean;
  king_of_the_hill_timestamp: null;
  market_cap: number;
  reply_count: number;
  last_reply: null;
  nsfw: boolean;
  market_id: null;
  inverted: null;
  is_currently_live: boolean;
  creator_username: null;
  creator_profile_image: null;
  usd_market_cap: number;
}

export type SocketMessage = ["tradeCreated", TradeCreatedEventData];

export function getTradeCreatedEventDataOrNull(messageData: string): TradeCreatedEventData | null {
  try {
    const regex = /^(:?\w+)\["tradeCreated",\s*({.*})\]$/;
    const match = messageData.match(regex);
    if (!match) return null;

    const [, , data] = match;
    return JSON.parse(data);
  } catch {
    return null;
  }
}
