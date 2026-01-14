import {
  deleteManyProducts,
  deleteProduct,
  getProductById,
  getProducts,
  postBulkProduct,
  postProduct,
  updateProduct,
} from "@/api/product";
import { TProduct } from "@/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useProducts = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryFn: () => getProducts(page, limit),
    queryKey: ["product", page, limit],

    placeholderData: keepPreviousData,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryFn: () => getProductById(id),
    queryKey: ["product", id],
    enabled: !!id,
  });
};

export const usePostProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TProduct) => postProduct(formData),
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while creating Product",
      );
    },
  });
};

export const useBulkPostProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (products: TProduct[]) => postBulkProduct(products),
    onSuccess: () => {
      toast.success("Products uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while uploading products"
      );
    },
  });
};



export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, id }: { formData: TProduct; id: string }) =>
      updateProduct(formData, id),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while updated Product",
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useDeleteManyProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteManyProducts(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Products deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
      toast.error("Failed to delete Products");
    },
  });
};
