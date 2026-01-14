import axiosInstance from "@/lib/axiosInstance";
import { TFaq } from "@/types/api";

export const postFaq = async (formData: TFaq) => {
  const res = await axiosInstance.post("/faqs", formData);

  return res.data;
};

export const getFaqs = async () => {
  const res = await axiosInstance.get(`/faqs`);
  return res.data;
};

export const updateFaq = async (formData: TFaq, id: string) => {
  const res = await axiosInstance.patch(`/faqs/${id}`, formData);

  return res.data;
};

export const deleteFaq = async (id: string) => {
  const res = await axiosInstance.delete(`/faqs/${id}`);

  return res.data;
};

export const deleteManyFaq = async (ids: string[]) => {
  const res = await axiosInstance.delete("/faqs", {
    data: { ids },
  });

  return res.data;
};
