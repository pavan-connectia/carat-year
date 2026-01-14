import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import {
  useDeleteManyProductCategorys,
  useDeleteProductCategory,
  useProductCategorys,
} from "@/hooks/useProductCategory";
import ProductCategoryForm from "@/components/products/ProductCategoryForm";
import { columns } from "@/components/products/productCategoryColumns";

export default function ProductCategory() {
  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useProductCategorys();
  const { mutate: deleteOne } = useDeleteProductCategory();
  const { mutate: deleteMany } = useDeleteManyProductCategorys();
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
        title="Product Category"
        description="Manage product categories"
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

      <ProductCategoryForm
        isOpen={modalOpen === "view" || modalOpen === "new"}
        onClose={handleClose}
        category={selectedData}
        length={data?.data?.length + 1}
      />

      {Object.keys(rowSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="testimonial"
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
