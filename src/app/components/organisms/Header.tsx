"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { navLinks } from "../utils/paths";
import Logo from "../atoms/Logo";
import LoginButton from "../atoms/LoginButton";
import { getAuth } from "@/app/lib/auth";
import LogoutButton from "../atoms/LogoutButton";

export type AuthType = {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState<AuthType>({
    token: null,
    username: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Initialize the auth state when the component mounts
    const initAuth = async () => {
      const authState = await getAuth();
      setAuth(authState);
    };

    initAuth();
  }, []);
  const handleLogoutAuth = () => {
    setAuth({
      token: null,
      username: null,
      isAuthenticated: false,
    });
  };

  return (
    <nav className="bg-white text-main-color shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className="hover:text-accent-color transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:block">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <p className="text-main-color">
                  Hello, <span className="font-bold">{auth.username}</span>
                </p>
                <LogoutButton handleLogoutAuth={handleLogoutAuth} />
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
          <div className="lg:hidden flex gap-2 items-center">
            {auth.isAuthenticated ? (
              <p className="text-main-color">
                Hello, <span className="!font-bold">{auth.username}</span>
              </p>
            ) : (
              <LoginButton />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-main-color focus:outline-none"
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              className="block text-main-color hover:text-accent-color"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {auth.isAuthenticated && (
            <LogoutButton handleLogoutAuth={handleLogoutAuth} />
          )}
        </div>
      )}
    </nav>
  );
}
