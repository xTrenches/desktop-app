import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getFeaturedCoins } from "@/api/pump.fun";
import CoinsTable from "@/components/pump-dot-fun/coins-table";
import CoinsTableSkeleton from "@/components/pump-dot-fun/coins-table-skeleton";

function featuredCoinsQueryOptions() {
  return queryOptions({
    queryKey: ["featured-coins"],
    queryFn: () => getFeaturedCoins(),
  });
}

export const Route = createFileRoute("/pump-dot-fun/featured")({
  loader: async ({ context: { queryClient } }) => queryClient.ensureQueryData(featuredCoinsQueryOptions()),
  component: RouteComponent,
  pendingComponent: () => <CoinsTableSkeleton />,
});

function RouteComponent() {
  const featuredCoinsQuery = useSuspenseQuery(featuredCoinsQueryOptions());

  return <CoinsTable coins={featuredCoinsQuery.data} />;
}
