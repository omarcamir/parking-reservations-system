"use client";

import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";

export default function AdminAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useProtectedRoute("admin"); // run your auth guard
  return <>{children}</>;
}
