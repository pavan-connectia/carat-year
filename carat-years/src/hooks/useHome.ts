import { getHome} from "@/api/home";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

export const useHome = () => {
  return useQuery({
    queryFn: getHome,
    queryKey: ["home"],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
