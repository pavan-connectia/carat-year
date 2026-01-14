import axiosInstance from "@/lib/axiosInstance";

export const getProducts = async (limit: number = 6) => {
  const res = await axiosInstance.get(`/product?publish=truelimit=${limit}`);
  return res.data;
};

export const getProductBySlug = async (slug: string) => {
  const res = await axiosInstance.get(`/product/${slug}`);
  return res.data;
};

export const getProductsByTag = async (tag: string) => {
  const res = await axiosInstance.get(`/product/tag/${tag}?limit=6`);
  return res.data;
};

export const getFilteredProducts = async ({
  filters = {},
  search = "",
  page = 1,
}: {
  filters?: Record<string, any>;
  search?: string;
  page?: number;
}) => {
  const params = new URLSearchParams(window.location.search);

  // ✅ Pagination
  params.set("limit", "12");
  params.set("page", page.toString());

  // ✅ Search
  if (search) params.set("search", search);
  else params.delete("search");


  // ✅ APPLY SIDEBAR FILTERS
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
      return;
    }

    if (key === "categories") {
      params.set(
        "tags",
        (value as string[]).map((v) => v.toLowerCase()).join(",")
      );
      return;
    }

    if (key === "metal") {
      params.set("color", value.join(","));
      return;
    }

    if (key === "priceRange") {
      params.set("minPrice", value[0].toString());
      params.set("maxPrice", value[1].toString());
      return;
    }

    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    }
  });

  const res = await axiosInstance.get(
    `/product/filter?${params.toString()}`
  );

  return res.data;
};




export const getSearchProducts = async (query: string) => {
  const res = await axiosInstance.get(`/product/search?query=${query}`);
  return res.data;
};
