import { postContactForm } from "@/api/contactForm";
import type { TContactForm } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostContactForm = () => {
  return useMutation({
    mutationFn: (formData: TContactForm) => postContactForm(formData),
    onSuccess: () => {
      toast.success("Contact form submitted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while submitting contact form.",
      );
    },
  });
};
