import { DateTime, DurationObjectUnits } from "luxon";
import numbro from "numbro";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getCoinsList } from "@/api/pump.fun";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TimeTicker from "@/helpers/time-ticker";
import { Progress } from "@/components/ui/progress";
import { CopyableContent } from "@/components/copyable-content";

export function coinsListQueryOptions() {
  return queryOptions({
    queryKey: ["coins-list"],
    queryFn: () => getCoinsList({ sortBy: "creationTime" }),
    refetchInterval: 1000 * 60 * 5,
  });
}

export const Route = createFileRoute("/pump-dot-fun/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(coinsListQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const coinsListQuery = useSuspenseQuery(coinsListQueryOptions());

  console.log(coinsListQuery.data);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead />
            <TableHead>Market Cap</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Bonding Curve</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Holders</TableHead>
            <TableHead>Snipers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coinsListQuery.data.map((coin) => (
            <TableRow key={coin.coinMint}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={coin.imageUrl} alt={coin.name} />
                  <AvatarFallback>{coin.ticker}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <CopyableContent content={coin.ticker}>
                  <span className="space-x-1.5">
                    <span>{coin.ticker}</span>{" "}
                    <span className="text-xs font-medium text-muted-foreground">{coin.name}</span>
                  </span>
                </CopyableContent>
              </TableCell>
              <TableCell>
                {numbro(coin.marketCap).format({ average: true, spaceSeparatedCurrency: true })}{" "}
                <span className="text-xs text-muted-foreground">USD</span>
              </TableCell>
              <TableCell>
                {numbro(coin.volume).format({
                  average: true,
                  mantissa: 2,
                  spaceSeparatedCurrency: true,
                })}{" "}
                <span className="text-xs text-muted-foreground">SOL</span>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <Progress value={coin.bondingCurveProgress} />
                  <span className="text-xs text-muted-foreground">{Math.round(coin.bondingCurveProgress)}%</span>
                </span>
              </TableCell>
              <TableCell>
                <TimeTicker interval={1000}>
                  {() => {
                    const date = DateTime.fromMillis(coin.creationTime);
                    const units: (keyof DurationObjectUnits)[] = ["days", "hours", "minutes", "seconds"];
                    const diff = DateTime.now().diff(date, units).toObject();
                    return units
                      .map((unit) => (diff[unit] ? `${Math.floor(diff[unit])}${unit[0]}` : ""))
                      .filter(Boolean)
                      .join(" ");
                  }}
                </TimeTicker>
              </TableCell>
              <TableCell>{coin.numHolders}</TableCell>
              <TableCell>{coin.sniperCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
