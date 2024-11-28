import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableSkeleton({
  rows = 10,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(columns)].map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-6 w-[100px]" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(rows)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {[...Array(columns)].map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
