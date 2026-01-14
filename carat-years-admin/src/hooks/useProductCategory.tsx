import {
  deleteManyProductCategorys,
  deleteProductCategory,
  getProductCategorys,
  postProductCategory,
  updateProductCategory,
} from "@/api/productCategory";
import { TProductCategory } from "@/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useProductCategorys = () => {
  return useQuery({
    queryFn: getProductCategorys,
    queryKey: ["product-category"],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const usePostProductCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TProductCategory) => postProductCategory(formData),
    onSuccess: () => {
      toast.success("ProductCategory created successfully");
      queryClient.invalidateQueries({ queryKey: ["product-category"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while creating ProductCategory",
      );
    },
  });
};

export const useUpdateProductCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      formData,
      id,
    }: {
      formData: TProductCategory;
      id: string;
    }) => updateProductCategory(formData, id),
    onSuccess: () => {
      toast.success("ProductCategory updated successfully");
      queryClient.invalidateQueries({ queryKey: ["product-category"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while updated ProductCategory",
      );
    },
  });
};

export const useDeleteProductCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProductCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-category"] });
      toast.success("ProductCategory deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useDeleteManyProductCategorys = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteManyProductCategorys(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-category"] });
      toast.success("ProductCategorys deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
      toast.error("Failed to delete ProductCategorys");
    },
  });
};
