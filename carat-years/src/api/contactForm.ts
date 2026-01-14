import axiosInstance from "@/lib/axiosInstance";
import type { TContactForm } from "@/types/api";

export const postContactForm = async (formData: TContactForm) => {
  const res = await axiosInstance.post(`/contact-form`, formData);
  return res.data;
};
