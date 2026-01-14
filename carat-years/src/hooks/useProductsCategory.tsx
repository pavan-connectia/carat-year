import { getProductsCategory } from "@/api/productCategory";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductCategorys = () => {
  return useQuery({
    queryFn: getProductsCategory,
    queryKey: ["products-category"],
    placeholderData: keepPreviousData,
  });
};
