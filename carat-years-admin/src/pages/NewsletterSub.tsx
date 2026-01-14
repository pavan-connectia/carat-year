import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import {
  useDeleteNewsletterSub,
  useDeleteManyNewsletterSubs,
  useNewsletterSubs,
} from "@/hooks/useNewsletterSub";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import { columns } from "@/components/news-letter/newsLetterColumns";
import NewsletterSubForm from "@/components/news-letter/NewsletterForm";
import Pagination from "@/components/shared/Pagination";
import { useNavigate, useSearchParams } from "react-router";
import DownloadNewsLetter from "@/components/news-letter/DownloadNewsLetter";

export default function NewsletterSub() {
  const navigate = useNavigate();
  const [q] = useSearchParams();
  const page = Number(q.get("page")) || 1;
  const limit = Number(q.get("limit")) || 10;
  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useNewsletterSubs();
  const { mutate: deleteOne } = useDeleteNewsletterSub();
  const { mutate: deleteMany } = useDeleteManyNewsletterSubs();
  const [modalOpen, setModalOpen] = useState<"none" | "view">("none");

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
        title="Newsletter subscribers"
        description="Manage newsletter subscribers"
      >
        <DownloadNewsLetter />
      </PageHeading>

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

      <NewsletterSubForm
        isOpen={modalOpen === "view"}
        onClose={handleClose}
        newsletterForm={selectedData}
      />

      {Object.keys(rowSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="newsletter subscribers"
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
