import {
  deleteManyNewsletterSub,
  deleteNewsletterSub,
  getNewsletterSubs,
} from "@/api/newsletterSub";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useNewsletterSubs = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryFn: () => getNewsletterSubs(page, limit),
    queryKey: ["newsletter-subscribers", page, limit],
    placeholderData: keepPreviousData,
  });
};

export const useDeleteNewsletterSub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNewsletterSub(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
      toast.success("Newsletter subscribers deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useDeleteManyNewsletterSubs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteManyNewsletterSub(ids),
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
