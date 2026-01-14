import axiosInstance from "@/lib/axiosInstance";
import { type TWishlist } from "@/types/api";

export const addToWishlist = async (formData: TWishlist) => {
  const res = await axiosInstance.post("/wishlist", formData);

  return res.data;
};

export const getWishlists = async () => {
  const res = await axiosInstance.get(`/wishlist`);
  return res.data;
};

export const removeFromWishlist = async (id: string) => {
  const res = await axiosInstance.delete(`/wishlist/${id}`);

  return res.data;
};
