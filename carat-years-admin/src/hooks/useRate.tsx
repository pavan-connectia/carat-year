import { getRates, updateRate } from "@/api/rate";
import { TRate } from "@/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useRates = () => {
  return useQuery({
    queryFn: getRates,
    queryKey: ["rate"],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useUpdateRate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TRate) => updateRate(formData),
    onSuccess: () => {
      toast.success("Rate updated successfully");
      queryClient.invalidateQueries({ queryKey: ["rate"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || "An error occurred while updated Rate",
      );
    },
  });
};
