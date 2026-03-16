import { getHome, updateHome } from "@/api/home";
import { THome } from "@/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useHome = () => {
  return useQuery({
    queryFn: getHome,
    queryKey: ["home"],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useUpdateHome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData}: { formData: THome}) =>
      updateHome(formData),
    onSuccess: () => {
      toast.success("Home updated successfully");
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || "An error occurred while updated home",
      );
    },
  });
};