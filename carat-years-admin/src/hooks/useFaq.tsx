import {
  deleteFaq,
  deleteManyFaq,
  getFaqs,
  postFaq,
  updateFaq,
} from "@/api/faq";
import { TFaq } from "@/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useFaqs = () => {
  return useQuery({
    queryFn: getFaqs,
    queryKey: ["faqs"],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const usePostFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TFaq) => postFaq(formData),
    onSuccess: () => {
      toast.success("Faq created successfully");
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || "An error occurred while creating faq",
      );
    },
  });
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, id }: { formData: TFaq; id: string }) =>
      updateFaq(formData, id),
    onSuccess: () => {
      toast.success("Faq updated successfully");
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || "An error occurred while updated faq",
      );
    },
  });
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("Faq deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useDeleteManyFaqs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteManyFaq(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("Faq(s) deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
      toast.error("Failed to delete FAQs");
    },
  });
};
