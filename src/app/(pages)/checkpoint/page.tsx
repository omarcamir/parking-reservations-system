"use client";

import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";
import ClientLayout from "@/app/Layout/ClientLayout";

function CheckpointContent() {
  useProtectedRoute("employee"); // ✅ runs inside StoreProvider
  return <>Checkpoint</>;
}

export default function Checkpoint() {
  return (
    <ClientLayout>
      <CheckpointContent />
    </ClientLayout>
  );
}
