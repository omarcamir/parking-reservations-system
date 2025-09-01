"use client";

import { ToastProvider } from "../contexts/ToastProvider";
import StoreProvider from "../StoreProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <StoreProvider>{children}</StoreProvider>
    </ToastProvider>
  );
}
