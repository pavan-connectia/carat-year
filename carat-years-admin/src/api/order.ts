import axiosInstance from "@/lib/axiosInstance";

export const getOrders = async (params: any) => {
  const res = await axiosInstance.get("/order", { params });
  return res.data;
};

export const getOrderById = async (id: string) => {
  const res = await axiosInstance.get(`/order/${id}`);
  return res.data;
};

export const updateOrder = async (formData: any, id: string) => {
  const res = await axiosInstance.patch(`/order/${id}`, formData);
  return res.data;
};

export const deleteOrder = async (id: string) => {
  const res = await axiosInstance.delete(`/order/${id}`);
  return res.data;
};

export const deleteManyOrders = async (ids: string[]) => {
  const res = await axiosInstance.delete("/order", { data: { ids } });
  return res.data;
};

export const getOrderStats = async () => {
  const res = await axiosInstance.get("/order/stats");
  return res.data.data;
};
