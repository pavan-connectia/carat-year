import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import {
  useDeleteDiscount,
  useDeleteManyDiscounts,
  useDiscounts,
} from "@/hooks/useDiscount";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import DiscountForm from "@/components/products/DiscountForm";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import { columns } from "@/components/products/discountColumns";

export default function Discounts() {
  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useDiscounts();
  const { mutate: deleteOne } = useDeleteDiscount();
  const { mutate: deleteMany } = useDeleteManyDiscounts();
  const [modalOpen, setModalOpen] = useState<"none" | "new" | "view">("none");

  const selectedId = Object.keys(rowSelection)[0];
  const selectedData =
    data?.data?.find((_: any, idx: number) => idx === Number(selectedId)) ??
    null;

  const handleDelete = () => {
    const selectedIndexes = Object.keys(rowSelection).map(Number);

    if (selectedIndexes.length === 0) return;

    const selectedIds = selectedIndexes.map((idx) => data?.data?.[idx]?._id);

    open({
      onConfirm: () => {
        if (selectedIds.length === 1) {
          deleteOne(selectedIds[0]);
        } else {
          deleteMany(selectedIds);
        }
      },
    });
    setRowSelection({});
  };

  const handleClose = () => {
    setModalOpen("none");
    setRowSelection({});
  };

  return (
    <>
      <PageHeading
        title="Discounts"
        description="Manage discount"
        onClick={() => setModalOpen("new")}
      />

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

      <DiscountForm
        isOpen={modalOpen === "view" || modalOpen === "new"}
        onClose={handleClose}
        discount={selectedData}
        length={data?.data?.length + 1}
      />

      {Object.keys(rowSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="discount"
          onClose={handleClose}
          onView={() => {
            setModalOpen("view");
          }}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
