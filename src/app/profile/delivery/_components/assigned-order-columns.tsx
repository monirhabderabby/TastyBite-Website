"use client";

import { Badge } from "@/components/ui/badge";
import { TOrder } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const assignedOrderColumns: ColumnDef<TOrder>[] = [
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => (
      <Badge className="bg-green-500">{row.original.paymentStatus}</Badge>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
  },
  {
    accessorKey: "orderStatus",
    header: "Order",
    cell: ({ row }) => (
      <Badge className="bg-green-500">
        {row.original.isCompleted
          ? "Completed"
          : row.original.isCancelled && "Cancelled"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Assigned on",
    cell: ({ row }) => <span>{moment(row.original.createdAt).fromNow()}</span>,
  },
];
