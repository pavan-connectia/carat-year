import axiosInstance from "@/lib/axiosInstance";

export type IAddToCart = {
  productId: string;
  metal: string;
  color: string;
  designType: string;
  style: string;
  stone: string;
  shape: string;
  carat: number;
  size?: string | null; 
  quantity?: number;
};

export type ICartItemIdentifier = {
  productId: string;
  metal: string;
  color: string;
  shape: string;
  carat: number;
  size: string;
};

export const addToCart = async (formData: IAddToCart) => {
  const res = await axiosInstance.post("/cart/add", formData);
  return res.data;
};

export const getCart = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data;
};

export const removeFromCart = async (item: ICartItemIdentifier) => {
  const res = await axiosInstance.delete("/cart/remove", { data: item });
  return res.data;
};

export const updateCartItem = async (
  item: ICartItemIdentifier,
  quantity: number,
) => {
  const res = await axiosInstance.put("/cart/update", { ...item, quantity });
  return res.data;
};

export const clearCart = async () => {
  const res = await axiosInstance.delete("/cart/clear");
  return res.data;
};

export const applyDiscount = async (code: string) => {
  const res = await axiosInstance.post("/cart/discount", { code: code });
  return res.data;
};

export const removeDiscount = async () => {
  const res = await axiosInstance.delete("/cart/discount");
  return res.data;
};
