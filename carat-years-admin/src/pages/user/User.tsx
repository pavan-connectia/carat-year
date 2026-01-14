import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import { useDeleteUser, useDeleteManyUsers, useUsers } from "@/hooks/useUser";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import { columns } from "@/components/user/UserColumns";
import Pagination from "@/components/shared/Pagination";
import { useNavigate, useSearchParams } from "react-router";
import DownloadUser from "@/components/user/DownloadUser";

export default function User() {
  const navigate = useNavigate();
  const [q] = useSearchParams();
  const page = Number(q.get("page")) || 1;
  const limit = Number(q.get("limit")) || 10;
  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useUsers(page, limit);
  const { mutate: deleteOne } = useDeleteUser();
  const { mutate: deleteMany } = useDeleteManyUsers();

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
    setRowSelection({});
  };

  return (
    <>
      <PageHeading title="Users" description="Manage users">
        <DownloadUser />
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

      {Object.keys(rowSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="User"
          onClose={handleClose}
          onView={() => {
            const selectedIndexes = Object.keys(rowSelection).map(Number);

            const selectedId = data?.data?.[selectedIndexes[0]]?._id;
            if (selectedId) {
              navigate(`/dashboard/users/${selectedId}`);
            }
          }}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
