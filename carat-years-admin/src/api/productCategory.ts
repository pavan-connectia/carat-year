import axiosInstance from "@/lib/axiosInstance";
import { TProductCategory } from "@/types/api";

export const postProductCategory = async (formData: TProductCategory) => {
  const res = await axiosInstance.post("/product-category", formData);

  return res.data;
};

export const getProductCategorys = async () => {
  const res = await axiosInstance.get(`/product-category`);
  return res.data;
};

export const updateProductCategory = async (
  formData: TProductCategory,
  id: string,
) => {
  const res = await axiosInstance.patch(`/product-category/${id}`, formData);

  return res.data;
};

export const deleteProductCategory = async (id: string) => {
  const res = await axiosInstance.delete(`/product-category/${id}`);

  return res.data;
};

export const deleteManyProductCategorys = async (ids: string[]) => {
  const res = await axiosInstance.delete("/product-category", {
    data: { ids },
  });

  return res.data;
};
