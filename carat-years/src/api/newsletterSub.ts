import axiosInstance from "@/lib/axiosInstance";
import { type TNewsletterSub } from "@/types/api";

export const postNewsletterSub = async (formData: TNewsletterSub) => {
  const res = await axiosInstance.post("/newsletter-subscribers", formData);

  return res.data;
};

export const unsubscribeNewsletter = async (email: string) => {
  const res = await axiosInstance.delete(
    "/newsletter-subscribers/unsubscribe",
    {
      data: { email },
    },
  );

  return res.data;
};
