"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TOrder } from "@/types";
import { ColumnDef, Row } from "@tanstack/react-table";

export const OrderColumn: ColumnDef<TOrder>[] = [
  {
    accessorKey: "invoiceId",
    header: "Invoice",
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
    cell: ({ row }: { row: Row<TOrder> }) => {
      const { totalPrice } = row.original;

      return <p>${totalPrice}</p>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }: { row: Row<TOrder> }) => {
      const paymentStatus = row.original.paymentStatus; // Access the paymentStatus
      return (
        <div>
          <Badge
            className={cn(
              paymentStatus === "Paid" ? "bg-green-700" : "bg-rose-700"
            )}
          >
            {paymentStatus}
          </Badge>
        </div>
      );
    },
  },
];
