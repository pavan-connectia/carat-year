import axiosInstance from "@/lib/axiosInstance";

export const getProductsCategory = async () => {
  const res = await axiosInstance.get(`/product-category?publish=true`);
  return res.data;
};
