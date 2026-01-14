import axiosInstance from "@/lib/axiosInstance";

export const createOrder = async (addressId: string, paymentMethod: string) => {
  const res = await axiosInstance.post("/order", {
    addressId: addressId,
    paymentMethod: paymentMethod,
  });

  return res.data;
};

export const getMyOrders = async (page: number = 1, limit: number = 10) => {
  const res = await axiosInstance.get(
    `/order/my-orders/?${limit}&page=${page}`,
  );
  return res.data;
};
