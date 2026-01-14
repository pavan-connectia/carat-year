import axiosInstance from "@/lib/axiosInstance";
import { TRate } from "@/types/api";

export const getRates = async () => {
  const res = await axiosInstance.get(`/rate`);
  return res.data;
};

export const updateRate = async (formData: TRate) => {
  const res = await axiosInstance.patch(`/rate/`, formData);

  return res.data;
};
