"use client";

// Packages
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Local imports
import TableSkeleton from "@/components/common/skeleton-loader/table-skeleton";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import ErrorState from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { useGetOrderForDeliverymanQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { assignedOrderColumns } from "./assigned-order-columns";

interface Props {
  userId: string;
}

const AssignedOrderTable = ({ userId }: Props) => {
  const { isLoading, data, isError } = useGetOrderForDeliverymanQuery({
    userId,
    isCompleted: true,
  });

  let content;

  if (isLoading) {
    content = <TableSkeleton rows={4} columns={5} />;
  } else if (isError || !data.success) {
    const msg = data?.message || "Something went wrong. Please try again";
    content = <ErrorState message={msg} />;
  } else if (data) {
    content = (
      <TableContainer data={data?.data} columns={assignedOrderColumns} />
    );
  }

  return content;
};

export default AssignedOrderTable;

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
        <div className="mt-4 text-primary-black">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
};
