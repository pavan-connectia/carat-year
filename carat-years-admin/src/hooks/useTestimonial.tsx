import {
  deleteManyTestimonials,
  deleteTestimonial,
  getTestimonials,
  postTestimonial,
  updateTestimonial,
} from "@/api/testimonial";
import { TTestimonial } from "@/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useTestimonials = () => {
  return useQuery({
    queryFn: getTestimonials,
    queryKey: ["testimonials"],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const usePostTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TTestimonial) => postTestimonial(formData),
    onSuccess: () => {
      toast.success("Testimonial created successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while creating testimonial",
      );
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, id }: { formData: TTestimonial; id: string }) =>
      updateTestimonial(formData, id),
    onSuccess: () => {
      toast.success("Testimonial updated successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while updated testimonial",
      );
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useDeleteManyTestimonials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteManyTestimonials(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonials deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
      toast.error("Failed to delete testimonials");
    },
  });
};
