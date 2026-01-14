import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  type IAddToCart,
  type ICartItemIdentifier,
  removeDiscount,
  applyDiscount,
} from "@/api/cart";
import useUserStore from "@/store/userStore";

export const useCart = () => {
  const { token } = useUserStore();
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 2,
    enabled: !!token,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: IAddToCart) => {
      return addToCart(formData);
    },
    onSuccess: () => {
      toast.success("Item added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while adding to cart",
      );
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: ICartItemIdentifier) => removeFromCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
    onError: (error: any) => {
      toast.error("Failed to remove item");
      console.error(error);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      item,
      quantity,
    }: {
      item: ICartItemIdentifier;
      quantity: number;
    }) => updateCartItem(item, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart updated successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to update cart");
      console.error(error);
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart cleared successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to clear cart");
      console.error(error);
    },
  });
};

export const useApplyDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => {
      return applyDiscount(code);
    },
    onSuccess: () => {
      toast.success("Coupon applied");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while adding to coupon",
      );
    },
  });
};

export const useRemoveDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeDiscount(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cupon removed");
    },
    onError: (error: any) => {
      toast.error("Failed to remove coupon");
      console.error(error);
    },
  });
};
