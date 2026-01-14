import { useState, useEffect } from "react"; // Added useEffect
import PageHeading from "@/layout/PageHeading";
import { DataTable } from "@/components/shared/DataTable";
import Toolbar from "@/components/shared/Toolbar";
import TableLoading from "@/components/shared/TableLoading";
import { useDeleteDialog } from "@/store/deleteDialogStore";
import { columns } from "@/components/products/productColumns";
import { useNavigate, useSearchParams } from "react-router";
import {
  useDeleteManyProducts,
  useDeleteProduct,
  useProducts,
} from "@/hooks/useProduct";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import BulkUpload from "@/components/products/BulkUpload";
import { useQueryClient } from "@tanstack/react-query";

export default function Product() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { open } = useDeleteDialog();
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useProducts(page, limit);

  const { mutate: deleteOne } = useDeleteProduct();
  const { mutate: deleteMany } = useDeleteManyProducts();

  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const queryClient = useQueryClient();

  // FIX: Clear selection when page or limit changes
  useEffect(() => {
    setRowSelection({});
  }, [page, limit]);

  const handleDelete = () => {
    // rowSelection keys are now Product IDs thanks to getRowId
    const selectedIds = Object.keys(rowSelection);

    if (selectedIds.length === 0) return;

    open({
      onConfirm: () => {
        if (selectedIds.length === 1) {
          deleteOne(selectedIds[0]);
        } else {
          deleteMany(selectedIds);
        }
        setRowSelection({}); // Clear after delete
      },
    });
  };

  const handleView = () => {
    const selectedIds = Object.keys(rowSelection);
    if (selectedIds.length !== 1) return;

    // Find the product in the current data set to get its slug
    const selectedProduct = data?.data?.find(
      (p: any) => p._id === selectedIds[0]
    );

    if (selectedProduct?.slug) {
      navigate(`/dashboard/products/${selectedProduct.slug}`);
    }
  };

  return (
    <>
      <PageHeading
        title="Products"
        description="Manage all products"
        onClick={() => navigate("/dashboard/products/new")}
      >
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => setShowBulkUpload(true)}
        >
          Bulk Upload
        </Button>
      </PageHeading>

      <Dialog open={showBulkUpload} onOpenChange={setShowBulkUpload}>
        <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import Products</DialogTitle>
            <DialogDescription>
              Upload an .json file formatted according to the template.
            </DialogDescription>
          </DialogHeader>
          <BulkUpload
            onClose={() => {
              setShowBulkUpload(false);
              queryClient.invalidateQueries({ queryKey: ["product"] });
            }}
          />
        </DialogContent>
      </Dialog>

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
          label="product"
          onClose={() => setRowSelection({})}
          onView={handleView}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}