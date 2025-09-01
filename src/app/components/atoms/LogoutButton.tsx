"use client";

import { logout } from "@/app/lib/auth";
import Button from "./Button";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  handleLogoutAuth: () => void;
};

const LogoutButton = ({ handleLogoutAuth }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = () => {
    handleLogoutAuth();
    logout();
    router.push("/");
  };

  return (
      <Button
        text="Logout"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        onClick={handleLogout}
      />
  );
};

export default LogoutButton;
