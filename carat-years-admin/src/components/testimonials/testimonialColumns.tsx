import { TTestimonial } from "@/types/api";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Img from "../shared/Img";

export const columns: ColumnDef<TTestimonial>[] = [
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
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Img
        src={`${row.original.image}`}
        className="size-14 object-contain"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  { accessorKey: "star", header: "Star" },
  { accessorKey: "order", header: "Order" },
  {
    accessorKey: "publish",
    header: "Publish",
    cell: ({ row }) => {
      const d = row.original;
      return (
        <span className="font-medium">
          {d.publish ? "Publish" : "UnPublished"}
        </span>
      );
    },
  },
];
