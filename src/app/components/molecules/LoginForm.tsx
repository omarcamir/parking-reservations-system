"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/rtkQuery/services/auth";
import ClientLayout from "@/app/Layout/ClientLayout";
import { useToast } from "@/app/contexts/ToastProvider";
import Button from "../atoms/Button";
import { useAuth } from "@/app/hooks/useAuth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { isLoading, error }] = useLoginMutation();

  const router = useRouter();
  const { showToast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginMutation({ username, password }).unwrap();
      const { user, token } = res;

      // Use RTK auth to handle login state
      login(token!, user?.username ?? "", user?.role ?? "");

      // Clear form
      setUsername("");
      setPassword("");

      // Show success toast
      showToast("Login successful!", "success");

      // Navigate after a small delay to allow toast to render
      setTimeout(() => {
        router.push("/admin");
      }, 500); // Increased delay to ensure toast shows
    } catch (err) {
      console.error("Login failed", err);
      showToast("Login failed. Please try again later", "error");
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
            {/* Handle error properly based on your error structure */}
            Login failed. Please check your credentials.
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
