import { getDiscounts, previewDiscount } from "@/api/discounts";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export const useDiscounts = () => {
  return useQuery({
    queryFn: getDiscounts,
    queryKey: ["discounts"],
    placeholderData: keepPreviousData,
  });
};


export const usePreviewDiscount = () => {
  return useMutation({
    mutationFn: previewDiscount,
  });
};
