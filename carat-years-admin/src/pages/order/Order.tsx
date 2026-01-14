import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import { columns } from "@/components/order/orderColumns";
import { useNavigate, useSearchParams } from "react-router";
import Pagination from "@/components/shared/Pagination";
import {
  useDeleteManyOrders,
  useDeleteOrder,
  useOrders,
} from "@/hooks/useOrder";
import { useDeleteDialog } from "@/store/deleteDialogStore";

export default function Order() {
  const navigate = useNavigate();
  const [q] = useSearchParams();

  const page = Number(q.get("page")) || 1;
  const limit = Number(q.get("limit")) || 10;

  const orderStatus = q.get("orderStatus") || undefined;
  const paymentMethod = q.get("paymentMethod") || undefined;
  const paymentStatus = q.get("paymentStatus") || undefined;
  const filterToday = q.get("filter") === "today";

  const [rowSelection, setRowSelection] = useState({});

  const { data, isLoading } = useOrders({
    page,
    limit,
    orderStatus,
    paymentMethod,
    paymentStatus,
    today: filterToday,
  });

  const { mutate: deleteOne } = useDeleteOrder();
  const { mutate: deleteMany } = useDeleteManyOrders();
  const { open } = useDeleteDialog();

  const handleDelete = () => {
    const ids = Object.keys(rowSelection)
      .map((i) => data?.data?.[Number(i)]?._id)
      .filter(Boolean) as string[];

    if (!ids.length) return;

    open({
      onConfirm: () => {
        ids.length === 1 ? deleteOne(ids[0]) : deleteMany(ids);
      },
    });

    setRowSelection({});
  };

  console.log("Row Selection:", rowSelection);


  return (
    <>
      <PageHeading title="Orders" description="Manage all orders" />

      {isLoading ? (
        <TableLoading />
      ) : (
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      )}

      <Pagination
        currentPage={page}
        totalPages={data?.pagination?.totalPages}
        onPageChange={(p) => navigate(`?page=${p}&limit=${limit}`)}
        onSelectChange={(l) => navigate(`?page=1&limit=${l}`)}
      />

      {Object.keys(rowSelection).length > 0 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="order"
          onClose={() => setRowSelection({})}
          onView={() => {
            const selectedId = Object.keys(rowSelection)[0];

            if (!selectedId) return;

            navigate(`/dashboard/orders/${selectedId}`);
          }}


          onDelete={handleDelete}
        />
      )}
    </>
  );
}
