import Img from "../ui/Img";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDeleteAccount } from "@/hooks/useUser";

type AccountDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function AccountDeleteDialog({
  open,
  onClose,
}: AccountDeleteDialogProps) {
  const { mutate } = useDeleteAccount();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-fit overflow-y-auto sm:max-w-xl">
        <div className="flex flex-col items-center text-center">
          <Img
            src="/home/delete.png"
            alt="Delete"
            className="mb-4 h-32 w-auto object-contain sm:h-40 md:h-44"
          />
          <h2 className="mb-2 text-lg font-semibold">
            Confirm Account Deletion
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            You are about to permanently delete your account. This action cannot
            be undone.
          </p>
          <div className="flex w-full flex-col gap-3 pb-5 sm:flex-row">
            <button
              className="flex-1 cursor-pointer rounded-full border border-gray-300 py-2 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 cursor-pointer rounded-full bg-[#AA0E0E] py-2 text-white hover:bg-[#AA0E0E]/90"
              onClick={() => mutate()}
            >
              Continue
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
