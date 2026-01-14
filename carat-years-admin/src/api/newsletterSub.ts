import axiosInstance from "@/lib/axiosInstance";

export const getNewsletterSubs = async (
  page: number = 1,
  limit: number = 10,
) => {
  const res = await axiosInstance.get(
    `/newsletter-subscribers/?${limit}&page=${page}`,
  );
  return res.data;
};

export const deleteNewsletterSub = async (id: string) => {
  const res = await axiosInstance.delete(`/newsletter-subscribers/${id}`);

  return res.data;
};

export const deleteManyNewsletterSub = async (ids: string[]) => {
  const res = await axiosInstance.delete("/newsletter-subscribers", {
    data: { ids },
  });

  return res.data;
};

export const downloadNewsletterSub = async () => {
  const res = await axiosInstance.get(`/newsletter-subscribers/download`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "newsletter_subscribers.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
};
