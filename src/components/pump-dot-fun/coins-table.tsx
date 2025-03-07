import { DateTime, DurationObjectUnits } from "luxon";
import numbro from "numbro";

import { Coin } from "@/api/pump.fun";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TimeTicker from "@/helpers/time-ticker";
import { Progress } from "@/components/ui/progress";
import { CopyableContent } from "@/components/copyable-content";

interface CoinsTableProps {
  coins: Coin[];
}

function CoinsTable({ coins }: CoinsTableProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px] min-w-[40px]" />
            <TableHead className="w-[20%] min-w-[140px]" />
            <TableHead className="w-[22%] min-w-[120px]">Bonding Curve</TableHead>
            <TableHead className="w-[15%] min-w-[90px]">Market Cap</TableHead>
            <TableHead className="w-[15%] min-w-[90px]">Volume</TableHead>
            <TableHead className="w-[10%] min-w-[65px]">Age</TableHead>
            <TableHead className="w-[8%] min-w-[50px] text-right">Holders</TableHead>
            <TableHead className="w-[8%] min-w-[50px] text-right">Snipers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.coinMint} className="transition-colors">
              <TableCell>
                <Avatar>
                  <AvatarImage src={coin.imageUrl} alt={coin.name} />
                  <AvatarFallback>{coin.ticker}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                <CopyableContent content={coin.ticker}>
                  <span className="space-x-1.5">
                    <span>{coin.ticker}</span> <span className="text-xs font-medium text-muted-foreground">{coin.name}</span>
                  </span>
                </CopyableContent>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <Progress value={coin.bondingCurveProgress} className="flex-1" />
                  <span className="text-xs font-medium text-muted-foreground w-[36px]">{Math.round(coin.bondingCurveProgress)}%</span>
                </span>
              </TableCell>
              <TableCell>
                {numbro(coin.marketCap).format({ average: true, spaceSeparatedCurrency: true })} <span className="text-xs text-muted-foreground">USD</span>
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
                <TimeTicker interval={1000}>
                  {() => {
                    const date = DateTime.fromMillis(coin.creationTime);
                    const units: (keyof DurationObjectUnits)[] = ["days", "hours", "minutes", "seconds"];
                    const diff = DateTime.now().diff(date, units).toObject();
                    if (Object.values(diff).filter(Boolean).length > 1 && "seconds" in diff) {
                      delete diff.seconds;
                    }
                    return units
                      .map((unit) => (diff[unit] ? `${Math.floor(diff[unit])}${unit[0]}` : ""))
                      .filter(Boolean)
                      .join(" ");
                  }}
                </TimeTicker>
              </TableCell>
              <TableCell className="text-right">{coin.numHolders}</TableCell>
              <TableCell className="text-right">{coin.sniperCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CoinsTable;
