import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TNewsletterSub } from "@/types/api";
import InputLabel from "../shared/InputLabel";

type NewsletterFormProps = {
  isOpen: boolean;
  onClose: () => void;
  newsletterForm?: TNewsletterSub | null;
};
export default function NewsletterSubForm({
  isOpen,
  onClose,
  newsletterForm,
}: NewsletterFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Newsletter subscribers</DialogTitle>
          <DialogDescription>
            Make changes to your newsletter TNewsletterSub form. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {[
            {
              label: "Date Time",
              value: newsletterForm?.createdAt
                ? new Date(newsletterForm?.createdAt).toLocaleString()
                : "-",
            },
            { label: "Name", value: newsletterForm?.email },
            { label: "Email", value: newsletterForm?.name },
          ].map((i) => (
            <InputLabel label={i.label} value={i.value} readOnly />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
