import axiosInstance from "@/lib/axiosInstance";
import { TDiscount } from "@/types/api";

export const postDiscount = async (formData: TDiscount) => {
  const res = await axiosInstance.post("/discount", formData);

  return res.data;
};

export const getDiscounts = async () => {
  const res = await axiosInstance.get(`/discount`);
  return res.data;
};

export const updateDiscount = async (formData: TDiscount, id: string) => {
  const res = await axiosInstance.patch(`/discount/${id}`, formData);

  return res.data;
};

export const deleteDiscount = async (id: string) => {
  const res = await axiosInstance.delete(`/discount/${id}`);

  return res.data;
};

export const deleteManyDiscounts = async (ids: string[]) => {
  const res = await axiosInstance.delete("/discount", {
    data: { ids },
  });

  return res.data;
};
