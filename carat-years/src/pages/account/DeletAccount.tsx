import AccountDeleteDialog from "@/components/account/AccountDeleteDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DeletAccount() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-medium font-playfair p-6">
      <h2 className="mb-4 text-xl font-semibold text-black uppercase">
        You’re about to delete your account
      </h2>
      <p className="mb-6 uppercase">
        Deleting your account is permanent. All your data, preferences, and
        history will be removed and cannot be recovered. Only proceed if you are
        sure you want to permanently delete your account.
      </p>
      <br />
      <Button
        type="submit"
        className="mb-5 w-full cursor-pointer rounded-3xl bg-[#351043] px-4 py-3 font-medium text-white transition-colors hover:bg-purple-950 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
        onClick={() => setOpen(true)}
      >
        Delete Account
      </Button>

      <AccountDeleteDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
