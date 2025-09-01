


"use client";

import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";
import ClientLayout from "@/app/Layout/ClientLayout";

function AdminContent() {
  useProtectedRoute("admin"); // ✅ runs inside StoreProvider
  return <>Admin</>;
}

export default function Admin() {
  return (
    <ClientLayout>
      <AdminContent />
    </ClientLayout>
  );
}
