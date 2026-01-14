import {
  deleteManyDiscounts,
  deleteDiscount,
  getDiscounts,
  postDiscount,
  updateDiscount,
} from "@/api/discount";
import { TDiscount } from "@/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useDiscounts = () => {
  return useQuery({
    queryFn: getDiscounts,
    queryKey: ["discount"],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const usePostDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TDiscount) => postDiscount(formData),
    onSuccess: () => {
      toast.success("Discount created successfully");
      queryClient.invalidateQueries({ queryKey: ["discount"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while creating testimonial",
      );
    },
  });
};

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, id }: { formData: TDiscount; id: string }) =>
      updateDiscount(formData, id),
    onSuccess: () => {
      toast.success("Discount updated successfully");
      queryClient.invalidateQueries({ queryKey: ["discount"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while updated testimonial",
      );
    },
  });
};

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discount"] });
      toast.success("Discount deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useDeleteManyDiscounts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteManyDiscounts(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discount"] });
      toast.success("Discount deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
      toast.error("Failed to delete testimonials");
    },
  });
};
