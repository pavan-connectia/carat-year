import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import { useDeleteFaq, useDeleteManyFaqs, useFaqs } from "@/hooks/useFaq";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import FaqForm from "@/components/faq/FaqForm";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import { columns } from "@/components/faq/faqColumns";

export default function Faqs() {
  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useFaqs();
  const { mutate: deleteOne } = useDeleteFaq();
  const { mutate: deleteMany } = useDeleteManyFaqs();
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
        title="Faqs"
        description="Manage faq"
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

      <FaqForm
        isOpen={modalOpen === "view" || modalOpen === "new"}
        onClose={handleClose}
        faq={selectedData}
        length={data?.data?.length + 1}
      />

      {Object.keys(rowSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="faq"
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
