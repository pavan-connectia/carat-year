import { createOrder, getMyOrders } from "@/api/order";
import useUserStore from "@/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMyOrders = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryFn: () => getMyOrders(page, limit),
    queryKey: ["order", page, limit],
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

type CreateOrderParams = {
  addressId: string;
  paymentMethod: string;
};

export const useCreateToOrder = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    // ✅ Only one argument — destructure inside
    mutationFn: ({ addressId, paymentMethod }: CreateOrderParams) => {
      if (!token) {
        toast.info("Login or signup to place an order");
        return Promise.reject("No token");
      }
      return createOrder(addressId, paymentMethod);
    },
    onSuccess: () => {
      toast.success("Order created successfully");
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while creating the order",
      );
    },
  });
};
