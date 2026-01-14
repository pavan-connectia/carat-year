import axiosInstance from "@/lib/axiosInstance";

export const getDiscounts = async () => {
  const res = await axiosInstance.get(`/discount?publish=true`);
  return res.data;
};


export const previewDiscount = async (payload: any) => {
  const res = await axiosInstance.post("/discount/preview", payload);
  return res.data;
};
