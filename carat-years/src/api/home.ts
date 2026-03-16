import axiosInstance from "@/lib/axiosInstance";

export const getHome = async () => {
  const res = await axiosInstance.get("/home");

  return res.data;
};
