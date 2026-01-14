import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  token?: string | null;
  name: string | null;
  email: string | null;
  mobile: string | null;
  login: (payload: Partial<UserState>) => void;
  logout: () => void;
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      name: null,
      email: null,
      mobile: null,
      login: (payload) =>
        set((state) => ({
          token: payload.token ?? state.token,
          name: payload.name ?? state.name,
          email: payload.email ?? state.email,
          mobile: payload.mobile ?? state.mobile,
        })),
      logout: () =>
        set({
          token: null,
          name: null,
          email: null,
          mobile: null,
        }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        token: state.token,
        name: state.name,
        email: state.email,
        mobile: state.mobile,
      }),
    },
  ),
);

export default useUserStore;
