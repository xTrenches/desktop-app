import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getAboutToGraduateCoins } from "@/api/pump.fun";
import CoinsTable from "@/components/pump-dot-fun/coins-table";
function aboutToGraduateCoinsQueryOptions() {
  return queryOptions({
    queryKey: ["about-to-graduate-coins"],
    queryFn: () => getAboutToGraduateCoins(),
    refetchInterval: 1000 * 60,
  });
}

export const Route = createFileRoute("/pump-dot-fun/about-to-graduate")({
  loader: async ({ context: { queryClient } }) => queryClient.ensureQueryData(aboutToGraduateCoinsQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const aboutToGraduateCoinsQuery = useSuspenseQuery(aboutToGraduateCoinsQueryOptions());

  return <CoinsTable coins={aboutToGraduateCoinsQuery.data} />;
}
