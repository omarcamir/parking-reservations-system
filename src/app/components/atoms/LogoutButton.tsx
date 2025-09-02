"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  handleLogoutAuth: () => void;
};

const LogoutButton = ({ handleLogoutAuth }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = () => {
    handleLogoutAuth();
    router.push("/");
  };

  return (
    <Button
      text="Logout"
      className="bg-white text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition duration-200"
      onClick={handleLogout}
    />
  );
};

export default LogoutButton;
