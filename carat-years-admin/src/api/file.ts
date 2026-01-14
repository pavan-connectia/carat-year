import axiosInstance from "@/lib/axiosInstance";

export const postUpload = async ({
  file,
  folder,
}: {
  file: File;
  folder: string;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    `/file/upload?folder=${folder}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const removeFile = async ({
  folder,
  filename,
}: {
  folder: string;
  filename: string;
}) => {
  if (!filename) throw new Error("Filename is required");

  const response = await axiosInstance.delete(`/remove`, {
    params: { folder, filename },
  });

  return response.data;
};
