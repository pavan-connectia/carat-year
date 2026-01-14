import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import {
  useDeleteTestimonial,
  useDeleteManyTestimonials,
  useTestimonials,
} from "@/hooks/useTestimonial";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import { columns } from "@/components/testimonials/testimonialColumns";

export default function Testimonials() {
  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useTestimonials();
  const { mutate: deleteOne } = useDeleteTestimonial();
  const { mutate: deleteMany } = useDeleteManyTestimonials();
  const [modalOpen, setModalOpen] = useState<"none" | "new" | "view">("none");


  const selectedId = Object.keys(rowSelection)[0];

  const selectedData =
    data?.data?.find((item: any) => item._id === selectedId) ?? null;


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
        title="Testimonials"
        description="Manage testimonial"
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

      <TestimonialForm
        isOpen={modalOpen === "view" || modalOpen === "new"}
        onClose={handleClose}
        testimonial={selectedData}
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
