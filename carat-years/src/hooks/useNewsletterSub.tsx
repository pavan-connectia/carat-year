import { postNewsletterSub, unsubscribeNewsletter } from "@/api/newsletterSub";
import type { TNewsletterSub } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostNewsletterSub = () => {
  return useMutation({
    mutationFn: (formData: TNewsletterSub) => postNewsletterSub(formData),
    onSuccess: () => {
      toast.success("Subscribed to newsletter successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit subscribe for newsletter. Please try again.",
      );
    },
  });
};

export const useUnsubscribeNewsletterSub = () => {
  return useMutation({
    mutationFn: (email: string) => unsubscribeNewsletter(email),
    onSuccess: () => {
      toast.success("Unsubscribed to newsletter successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to unsubscribe for newsletter. Please try again.",
      );
    },
  });
};
