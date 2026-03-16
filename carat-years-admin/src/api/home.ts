import axiosInstance from "@/lib/axiosInstance";
import { THome } from "@/types/api";

export const getHome = async () => {
  const res = await axiosInstance.get("/home");

  return res.data;
};

export const updateHome = async (formData: THome) => {
  const res = await axiosInstance.put(`/home`, formData);

  return res.data;
};