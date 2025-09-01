"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/rtkQuery/services/auth";
import ClientLayout from "@/app/Layout/ClientLayout";
import { useToast } from "@/app/contexts/ToastProvider";
import Button from "../atoms/Button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ username, password }).unwrap();
      const { user, token } = res;

      // Save token cookie, expires in 7 days
      const isProd = process.env.NODE_ENV === "production";

       document.cookie = `token=${encodeURIComponent(token!)}; path=/; max-age=${7 * 24 * 60 * 60}; ${isProd ? "Secure;" : ""} SameSite=Lax`;
    document.cookie = `username=${encodeURIComponent(user?.username ?? "")}; path=/; max-age=${7 * 24 * 60 * 60}; ${isProd ? "Secure;" : ""} SameSite=Lax`;
    document.cookie = `role=${encodeURIComponent(user?.role ?? "")}; path=/; max-age=${7 * 24 * 60 * 60}; ${isProd ? "Secure;" : ""} SameSite=Lax`;

      showToast("Login successful!", "success");
      // Clear form
      setUsername("");
      setPassword("");
      router.push("/checkpoint");
    } catch (err) {
      console.error("Login failed", err);
      showToast("Login failed. try again later", "error");
    }
  };

  return (
    <ClientLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error instanceof Error}
          </div>
        )}
        <Button
          text="Login"
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full bg-main-color text-white py-2 rounded hover:bg-accent-color transition duration-200"
        />
      </form>
    </ClientLayout>
  );
};

export default LoginForm;
