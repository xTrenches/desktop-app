import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import useWebSocket from "react-use-websocket";
import { useDebouncedCallback } from "use-debounce";

import { Coin, getCoinMetadataAndTrades, getTradeCreatedEventDataOrNull } from "@/api/pump.fun";

export const Route = createFileRoute("/pump-dot-fun")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const debouncedSocketMessageHandler = useDebouncedCallback(
    async (e) => {
      const data = getTradeCreatedEventDataOrNull(e.data);
      if (!data) return;
      const coinsListQuery = queryClient.getQueryData<Coin[]>(["coins-list"]);
      if (!coinsListQuery) return;

      const listCopy = [...coinsListQuery];
      const itemIndex = listCopy.findIndex((coin) => coin.coinMint === data.mint);
      if (itemIndex === -1) return listCopy;

      const updatedData = await getCoinMetadataAndTrades(data.mint);

      listCopy[itemIndex] = {
        ...listCopy[itemIndex],
        numHolders: Number(updatedData.coin.num_holders),
        marketCap: Number(updatedData.coin.marketcap),
        volume: Number(updatedData.coin.volume),
        bondingCurveProgress: Number(updatedData.coin.progress),
        sniperCount: Number(updatedData.coin.sniper_count),
        currentMarketPrice: Number(updatedData.coin.current_market_price),
      };

      queryClient.setQueryData(["coins-list"], [...listCopy]);
    },
    300,
    { maxWait: 1000 * 60 }
  );

  const socket = useWebSocket("wss://frontend-api-v3.pump.fun/socket.io/?EIO=4&transport=websocket", {
    onOpen: () => {
      socket.sendMessage("40");
    },
    filter: (message: MessageEvent) => {
      const data = getTradeCreatedEventDataOrNull(message.data);
      const coinsListQuery = queryClient.getQueryData<Coin[]>(["coins-list"]);
      if (!coinsListQuery) return false;
      return !!data && coinsListQuery.some((coin) => coin.coinMint === data.mint);
    },
    onMessage: (e) => debouncedSocketMessageHandler(e),
  });

  useEffect(() => {
    return () => {
      debouncedSocketMessageHandler.flush();
    };
  }, []);

  return <Outlet />;
}
