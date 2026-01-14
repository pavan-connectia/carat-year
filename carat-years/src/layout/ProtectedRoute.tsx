import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { token } = useUserStore();
  const [ready, setReady] = useState(false);

  // Small delay to ensure Zustand (or localStorage) has initialized
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null; // or a loader

  return token ? <Outlet /> : <Navigate to="/" replace />;
}
