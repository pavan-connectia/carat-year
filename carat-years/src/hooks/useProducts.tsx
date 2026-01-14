import {
  getFilteredProducts,
  getProductBySlug,
  getProducts,
  getProductsByTag,
  getSearchProducts,
} from "@/api/products";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProducts = (limit?: number) => {
  return useQuery({
    queryFn: () => getProducts(limit),
    queryKey: ["products"],
    placeholderData: keepPreviousData,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryFn: () => getProductBySlug(slug),
    queryKey: ["products", slug],
  });
};

export const useProductsByTag = (tag: string) => {
  return useQuery({
    queryFn: () => getProductsByTag(tag),
    queryKey: ["products", "tag", tag],
  });
};

type FilterParams = {
  filters?: Record<string, any>;
  search?: string;
  page?: number;
};

export const useFilteredProducts = (
  {
    filters = {},
    search = "",
    page = 1,
  }: FilterParams,
  options?: any
) => {
  return useQuery({
    queryKey: ["product-filter", page, filters, search],
    queryFn: () => getFilteredProducts({ filters, search, page }),
    enabled: options?.enabled ?? true,
  });
};



export const useSearchProducts = (query: string) => {
  return useQuery({
    queryFn: () => getSearchProducts(query),
    queryKey: ["product", "search", query],
    enabled: !!query,
    placeholderData: keepPreviousData,
  });
};
