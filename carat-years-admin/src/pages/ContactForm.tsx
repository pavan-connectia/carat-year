import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import {
  useDeleteContactForm,
  useDeleteManyContactForms,
  useContactForms,
} from "@/hooks/useContactForm";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import { columns } from "@/components/contact-form/contactFormColumns";
import ContactFormSub from "@/components/contact-form/ContactFormSub";
import Pagination from "@/components/shared/Pagination";
import { useNavigate, useSearchParams } from "react-router";

export default function contactForm() {
  const navigate = useNavigate();
  const [q] = useSearchParams();
  const page = Number(q.get("page")) || 1;
  const limit = Number(q.get("limit")) || 10;
  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useContactForms();
  const { mutate: deleteOne } = useDeleteContactForm();
  const { mutate: deleteMany } = useDeleteManyContactForms();
  const [modalOpen, setModalOpen] = useState<"none" | "view">("none");

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
        title="Contact form submission"
        description="Manage contact form submission"
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

      <Pagination
        currentPage={page}
        totalPages={data?.pagination?.totalPages}
        onPageChange={(p) => navigate(`?page=${p}&limit=${limit}`)}
        onSelectChange={(l) => navigate(`?page=1&limit=${l}`)}
      />

      <ContactFormSub
        isOpen={modalOpen === "view"}
        onClose={handleClose}
        contactForm={selectedData}
      />

      {Object.keys(rowSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="contact form submission"
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
