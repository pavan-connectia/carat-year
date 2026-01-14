import axiosInstance from "@/lib/axiosInstance";
import { TProduct } from "@/types/api";

export const postProduct = async (formData: TProduct) => {
  const res = await axiosInstance.post("/product", formData);

  return res.data;
};

export const postBulkProduct = (products: TProduct[]) => {
  return axiosInstance.post(
    "/product/bulk",
    products,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};



export const getProducts = async (page: number = 1, limit: number = 10) => {
  const res = await axiosInstance.get(`/product/?${limit}&page=${page}`);
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/product/${id}`);
  return res.data;
};

export const updateProduct = async (formData: TProduct, id: string) => {
  const res = await axiosInstance.patch(`/product/${id}`, formData);

  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/product/${id}`);

  return res.data;
};

export const deleteManyProducts = async (ids: string[]) => {
  const res = await axiosInstance.delete("/product", {
    data: { ids },
  });

  return res.data;
};
