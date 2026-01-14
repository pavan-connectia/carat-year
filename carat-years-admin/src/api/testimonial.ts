import axiosInstance from "@/lib/axiosInstance";
import { TTestimonial } from "@/types/api";

export const postTestimonial = async (formData: TTestimonial) => {
  const res = await axiosInstance.post("/testimonials", formData);

  return res.data;
};

export const getTestimonials = async () => {
  const res = await axiosInstance.get(`/testimonials`);
  return res.data;
};

export const updateTestimonial = async (formData: TTestimonial, id: string) => {
  const res = await axiosInstance.patch(`/testimonials/${id}`, formData);

  return res.data;
};

export const deleteTestimonial = async (id: string) => {
  const res = await axiosInstance.delete(`/testimonials/${id}`);

  return res.data;
};

export const deleteManyTestimonials = async (ids: string[]) => {
  const res = await axiosInstance.delete("/testimonials", {
    data: { ids },
  });

  return res.data;
};
