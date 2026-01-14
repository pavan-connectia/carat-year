import axiosInstance from "@/lib/axiosInstance";
import { TCreateUser, TUser } from "@/types/api";

export const postSignup = async (formData: TCreateUser) => {
  const res = await axiosInstance.post("/user/signup", {
    ...formData,
  });

  return res.data;
};

export const getUsers = async (page: number = 1, limit: number = 10) => {
  const res = await axiosInstance.get(`/user/?limit=${limit}&page=${page}`);

  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axiosInstance.get(`/user/${id}`);

  return res.data;
};

export const updateUser = async (formData: TUser, id: string) => {
  const res = await axiosInstance.patch(`/user/${id}`, formData);

  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axiosInstance.delete(`/user/${id}`);

  return res.data;
};

export const deleteManyUsers = async (ids: string[]) => {
  const res = await axiosInstance.delete("/user", {
    data: { ids },
  });

  return res.data;
};

export const downloadUser = async () => {
  const res = await axiosInstance.get(`/user/download`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "user.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
};
