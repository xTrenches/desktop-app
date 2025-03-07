import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

function CoinsTableSkeleton() {
  // Create an array of 10 items for skeleton rows
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i);

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
          {skeletonRows.map((index) => (
            <TableRow key={index} className="transition-colors">
              <TableCell>
                <Skeleton className="h-10 w-10 rounded-full" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2 flex-1" />
                  <Skeleton className="h-4 w-[36px]" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-12 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-12 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CoinsTableSkeleton;
