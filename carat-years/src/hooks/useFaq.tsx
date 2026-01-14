import { getFaqs } from "@/api/faq";
import { useQuery } from "@tanstack/react-query";

export const useFaqs = () => {
  return useQuery({
    queryFn: getFaqs,
    queryKey: ["faqs"],
  });
};
