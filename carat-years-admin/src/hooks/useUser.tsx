import {
  deleteManyUsers,
  deleteUser,
  getUserById,
  getUsers,
  postSignup,
  updateUser,
} from "@/api/user";
import { TCreateUser, TUser } from "@/types/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useUsers = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryFn: () => getUsers(page, limit),
    queryKey: ["user", page, limit],
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};

export const useUserById = (id: string) => {
  return useQuery({
    queryFn: () => getUserById(id ?? ""),
    queryKey: ["user", id],
    enabled: !!id,
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: TCreateUser) => postSignup(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message ||
          "An error occurred while creating super admin.",
      );
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, id }: { formData: TUser; id: string }) =>
      updateUser(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || "An error occurred while updated User",
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
    },
  });
};

export const useDeleteManyUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteManyUsers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      console.error("Delete failed", error);
      toast.error("Failed to delete User");
    },
  });
};
