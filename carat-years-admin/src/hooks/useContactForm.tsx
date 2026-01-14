import {
  deleteManyContactForm,
  deleteContactForm,
  getContactForms,
} from "@/api/contactForm";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useContactForms = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryFn: () => getContactForms(page, limit),
    queryKey: ["newsletter-subscribers", page, limit],
    placeholderData: keepPreviousData,
  });
};

export const useDeleteContactForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContactForm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
      toast.success("Newsletter subscribers deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useDeleteManyContactForms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteManyContactForm(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
      toast.success("Newsletter subscribers deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
      toast.error("Failed to delete Newsletter subscribers");
    },
  });
};
