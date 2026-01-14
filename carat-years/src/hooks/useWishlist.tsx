import {
  removeFromWishlist,
  getWishlists,
  addToWishlist,
} from "@/api/wishlist";
import useUserStore from "@/store/userStore";
import { type TWishlist } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useWishlists = () => {
  return useQuery({
    queryFn: getWishlists,
    queryKey: ["wishlist"],
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useAddToWishlist = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TWishlist) => {
      if (!token) {
        toast.info("Login or signup to add item to wishlist");
        return Promise.reject("No token"); // prevent API call
      }
      return addToWishlist(formData);
    },
    onSuccess: () => {
      toast.success("Item added to wishlist successfully");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while adding to wishlist",
      );
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeFromWishlist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Wishlist deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};
