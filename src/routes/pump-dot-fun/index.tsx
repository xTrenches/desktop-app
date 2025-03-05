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
            <TableHead className="w-[5%] min-w-[50px]" />
            <TableHead className="w-[20%] min-w-[180px]" />
            <TableHead className="w-[12%] min-w-[120px]">Market Cap</TableHead>
            <TableHead className="w-[10%] min-w-[100px]">Volume</TableHead>
            <TableHead className="w-[12%] min-w-[120px]">Bonding Curve</TableHead>
            <TableHead className="w-[8%] min-w-[80px]">Age</TableHead>
            <TableHead className="w-[4%] min-w-[70px]">Holders</TableHead>
            <TableHead className="w-[4%] min-w-[70px]">Snipers</TableHead>
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
