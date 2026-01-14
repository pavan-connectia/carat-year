import { useState } from "react";
import PageHeading from "@/layout/PageHeading";
import {
  useDeleteSuperAdmin,
  useDeleteManySuperAdmins,
  useSuperAdmins,
} from "@/hooks/useSuperAdmin";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import SuperAdminForm from "@/components/super-admin/SuperAdminForm";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import { columns } from "@/components/super-admin/superAdminColumns";

export default function SuperAdmin() {
  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useSuperAdmins();
  const { mutate: deleteOne } = useDeleteSuperAdmin();
  const { mutate: deleteMany } = useDeleteManySuperAdmins();
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
        title="SuperAdmins"
        description="Manage super admin"
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

      <SuperAdminForm
        isOpen={modalOpen === "view" || modalOpen === "new"}
        onClose={handleClose}
        superAdmin={selectedData}
      />

      {Object.keys(rowSelection).length >= 1 && (
        <Toolbar
          number={Object.keys(rowSelection).length}
          label="superadmin"
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
