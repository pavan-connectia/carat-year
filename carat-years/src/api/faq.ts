import axiosInstance from "@/lib/axiosInstance";

export const getFaqs = async () => {
  const res = await axiosInstance.get("/faqs?publish=true");

  return res.data;
};
