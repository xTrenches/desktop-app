import { getTokenPairs } from "@/api/dexscreener";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function tokenPairsQueryOptions(chainId: string, tokenAddresses: string[]) {
  return queryOptions({
    queryKey: ["token-pairs", chainId, tokenAddresses],
    queryFn: () => getTokenPairs(chainId, tokenAddresses),
    // refetchInterval: 3000,
  });
}

export const Route = createFileRoute("/$coin")({
  loader: async ({ context: { queryClient }, params }) => queryClient.ensureQueryData(tokenPairsQueryOptions("solana", [params.coin])),
  component: RouteComponent,
});

function RouteComponent() {
  const { coin } = Route.useParams();
  const tokenPairsQuery = useSuspenseQuery(tokenPairsQueryOptions("solana", [coin]));
  const pairAddress = tokenPairsQuery.data[0]?.pairAddress;

  console.log(tokenPairsQuery.data, pairAddress);

  return (
    <div className="flex-1">
      <iframe
        height="100%"
        width="100%"
        id="geckoterminal-embed"
        title="GeckoTerminal Embed"
        src={`https://www.geckoterminal.com/solana/pools/${pairAddress}?embed=1&info=0&swaps=1&grayscale=1&light_chart=0&chart_type=price&resolution=15m`}
        frameBorder="0"
        allow="clipboard-write"
        allowFullScreen
      />
    </div>
  );
}
