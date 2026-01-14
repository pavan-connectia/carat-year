import { TOrder } from "@/types/api";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => row.original._id.slice(-6).toUpperCase(), // last 6 chars
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) =>
      typeof row.original.user === "string"
        ? row.original.user
        : row.original.user.name || row.original.user.email,
  },
  {
    header: "Items",
    cell: ({ row }) => row.original.items.length,
  },
  {
    accessorKey: "finalTotal",
    header: "Total Price",
    cell: ({ row }) => `₹ ${row.original.finalTotal.toLocaleString("en-IN")}`,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => row.original.paymentStatus.toUpperCase(),
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => row.original.orderStatus.toUpperCase(),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.createdAt || "").toLocaleDateString("en-IN"),
  },
];
