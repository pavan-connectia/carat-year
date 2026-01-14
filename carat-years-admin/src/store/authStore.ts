import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "SuperAdmin" | "Admin";

type AuthState = {
  token?: string | null;
  name: string | null;
  email: string | null;
  role?: UserRole | null;
  login: (payload: Partial<AuthState>) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      name: null,
      email: null,
      role: null,
      login: (payload) =>
        set((state) => ({
          token: payload.token ?? state.token,
          name: payload.name ?? state.name,
          email: payload.email ?? state.email,
          role: payload.role ?? state.role,
        })),
      logout: () =>
        set({
          token: null,
          name: null,
          email: null,
          role: null,
        }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        token: state.token,
        name: state.name,
        email: state.email,
        role: state.role,
      }),
    },
  ),
);

export default useAuthStore;
