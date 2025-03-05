import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { tokenProfilesQueryOptions, tokenPairsQueryOptions } from "@/api/dexscreener";
import { useQueries, useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(tokenProfilesQueryOptions()),
  component: Index,
});

function Index() {
  const tokenProfilesQuery = useSuspenseQuery(tokenProfilesQueryOptions());
  const tokenPairsQueries = useQueries({
    queries: tokenProfilesQuery.data.map((tokenProfile) =>
      tokenPairsQueryOptions(tokenProfile.chainId, [tokenProfile.tokenAddress])
    ),
  });

  console.log(tokenPairsQueries.flatMap((query) => query.data));

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
  );
}
