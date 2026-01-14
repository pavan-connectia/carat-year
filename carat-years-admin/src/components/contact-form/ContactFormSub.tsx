import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TContactForm } from "@/types/api";
import InputLabel from "../shared/InputLabel";
import TextareaLabel from "../shared/TextAreaLabel";

type ContactFormSubProps = {
  isOpen: boolean;
  onClose: () => void;
  contactForm?: TContactForm | null;
};
export default function ContactFormSub({
  isOpen,
  onClose,
  contactForm,
}: ContactFormSubProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact form submission</DialogTitle>
          <DialogDescription>
            Make changes to your contact form submission. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {[
            {
              label: "Date Time",
              value: contactForm?.createdAt
                ? new Date(contactForm?.createdAt).toLocaleString()
                : "-",
            },
            { label: "Name", value: contactForm?.email },
            { label: "Email", value: contactForm?.name },
          ].map((i) => (
            <InputLabel label={i.label} value={i.value} readOnly />
          ))}
          <TextareaLabel
            label="Message"
            value={contactForm?.message}
            readOnly
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
