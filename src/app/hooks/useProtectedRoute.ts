"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useProtectedRoute(requiredRole?: "employee" | "admin") {
  const { isAuthenticated, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
    } else if (requiredRole && role !== requiredRole) {
      router.push("/");
    }
  }, [isAuthenticated, role, isLoading, router, requiredRole]);
}
