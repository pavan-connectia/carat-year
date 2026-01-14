import { AppSidebar } from "./AppSidebar";
import Header from "./Header";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import DeleteDialog from "@/components/shared/DeleteDialog";
import { useDeleteDialog } from "@/store/deleteDialogStore";

export default function Layout() {
  const { isOpen, close, onConfirm } = useDeleteDialog();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <div className="mx-auto max-w-7xl p-3 sm:p-5 md:px-8">
          <Outlet />
        </div>
      </main>
      <DeleteDialog
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => {
          onConfirm?.();
          close();
        }}
      />
    </SidebarProvider>
  );
}
