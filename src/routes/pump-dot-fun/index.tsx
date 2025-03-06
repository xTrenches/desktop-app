import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getCoinsList } from "@/api/pump.fun";
import CoinsTable from "@/components/pump-dot-fun/coins-table";

function coinsListQueryOptions() {
  return queryOptions({
    queryKey: ["coins-list"],
    queryFn: () => getCoinsList({ sortBy: "creationTime" }),
    refetchInterval: 1000 * 60,
  });
}

export const Route = createFileRoute("/pump-dot-fun/")({
  loader: async ({ context: { queryClient } }) => queryClient.ensureQueryData(coinsListQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const coinsListQuery = useSuspenseQuery(coinsListQueryOptions());

  return <CoinsTable coins={coinsListQuery.data} />;
}
