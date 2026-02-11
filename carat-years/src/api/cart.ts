import axiosInstance from "@/lib/axiosInstance";
import useUserStore from "@/store/userStore";

export type IAddToCart = {
  productId: string;
  metal: string;
  color: string;
  designType: string;
  style: string;
  stone: string;
  shape: string;
  carat: number;
  size?: string | null; 
  quantity?: number;
};

export type ICartItemIdentifier = {
  productId: string;
  metal: string;
  color: string;
  shape: string;
  carat: number;
  size: string;
};

export const addToCart = async (formData: IAddToCart) => {
  const res = await axiosInstance.post("/cart/add", formData);
  return res.data;
};

// Pass token as an argument
export const getCart = async (token?: string | null) => {
  if (token) {
    // Logged in user: Use GET
    const res = await axiosInstance.get("/cart");
    return res.data;
  } else {
    // Guest user: Use POST with localStorage items
    const localCartRaw = localStorage.getItem("localCart");
    let localItems = [];
    
    try {
      localItems = localCartRaw ? JSON.parse(localCartRaw) : [];
    } catch (e) {
      localItems = [];
    }

    if (localItems.length === 0) {
      return {
        success: true,
        data: { items: [], subtotal: 0, finalTotal: 0 },
      };
    }

    // Backend handles this POST via resolveUser middleware
    const res = await axiosInstance.post("/cart", { items: localItems });
    return res.data;
  }
};

export const removeFromCart = async (item: ICartItemIdentifier) => {
  const res = await axiosInstance.delete("/cart/remove", { data: item });
  return res.data;
};

export const updateCartItem = async (
  item: ICartItemIdentifier,
  quantity: number,
) => {
  const res = await axiosInstance.put("/cart/update", { ...item, quantity });
  return res.data;
};

export const clearCart = async () => {
  const res = await axiosInstance.delete("/cart/clear");
  return res.data;
};

export const applyDiscount = async (code: string) => {
  const res = await axiosInstance.post("/cart/discount", { code: code });
  return res.data;
};

export const removeDiscount = async () => {
  const res = await axiosInstance.delete("/cart/discount");
  return res.data;
};

export const syncCartApi = async (localItems: any[]) => {
  const res = await axiosInstance.post("/cart/sync", { localItems });
  return res.data;
};