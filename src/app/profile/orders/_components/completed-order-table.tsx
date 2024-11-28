"use client";
// Packages
import { useUser } from "@clerk/nextjs";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { redirect } from "next/navigation";

// Localimports
import TableSkeleton from "@/components/common/skeleton-loader/table-skeleton";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { Input } from "@/components/ui/input";
import { useGetCompletedOrderQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { OrderColumn } from "./order-column";

const CompletedOrderTable = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return;
  if (!isSignedIn) redirect("/login");

  const { data, isLoading } = useGetCompletedOrderQuery({
    userId: user?.id,
  });

  let content;

  if (isLoading) {
    content = <TableSkeleton rows={4} columns={6} />;
  } else if (data) {
    content = <TableContainer data={data?.data} columns={OrderColumn} />;
  }

  return content;
};

export default CompletedOrderTable;

interface TableContainerProps {
  data: TOrder[];
  columns: ColumnDef<TOrder>[];
}

const TableContainer = ({ data, columns }: TableContainerProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter by Invoice id"
          value={
            (table.getColumn("invoiceId")?.getFilterValue() as string) ?? ""
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("invoiceId")?.setFilterValue(event.target.value)
          }
          className="max-w-[300px] focus-visible:ring-[#3a6f54] text-primary-black"
        />

        <div className="flex items-center gap-x-2">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <DataTable columns={columns} table={table} />
      {data?.length > 10 && (
        <div className="mt-4">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
};
