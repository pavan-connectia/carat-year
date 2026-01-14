import axiosInstance from "@/lib/axiosInstance";

export const getTestimonials = async () => {
  const res = await axiosInstance.get(`/testimonials?publish=true`);
  return res.data.data || [];
};
