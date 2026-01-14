import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  deleteManyOrders,
  getOrderStats,
} from "@/api/order";
import { toast } from "sonner";

export const useOrders = (params: any) => {
  return useQuery({
    queryKey: ["order", params],
    queryFn: () => getOrders(params),
    placeholderData: keepPreviousData,
  });
};

export const useOrder = (id: string) =>
  useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });

export const useOrderStats = () =>
  useQuery({
    queryKey: ["order-stats"],
    queryFn: getOrderStats,
  });

export const useUpdateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: any) => updateOrder(formData, id),
    onSuccess: () => {
      toast.success("Order updated");
      qc.invalidateQueries({ queryKey: ["order"] });
    },
  });
};

export const useDeleteOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Order deleted");
      qc.invalidateQueries({ queryKey: ["order"] });
    },
  });
};

export const useDeleteManyOrders = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteManyOrders,
    onSuccess: () => {
      toast.success("Orders deleted");
      qc.invalidateQueries({ queryKey: ["order"] });
    },
  });
};
