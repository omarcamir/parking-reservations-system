"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { navLinks } from "../utils/paths";
import Logo from "../atoms/Logo";
import LoginButton from "../atoms/LoginButton";
import LogoutButton from "../atoms/LogoutButton";
import { usePathname } from "next/navigation";

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState({
    username: null as string | null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Function to update auth state from cookies
  const updateAuthFromCookies = useCallback(() => {
    const token = getCookie("token");
    const username = getCookie("username");

    setAuth({
      username,
      isAuthenticated: !!token,
      isLoading: false,
    });
  }, []);

  useEffect(() => {
    // Initial auth state load
    updateAuthFromCookies();

    // Listen for auth changes (custom event from your auth system)
    window.addEventListener("authChange", updateAuthFromCookies);
    return () =>
      window.removeEventListener("authChange", updateAuthFromCookies);
  }, [updateAuthFromCookies]);
  const pathname = usePathname();

  useEffect(() => {
    updateAuthFromCookies();
  }, [pathname, updateAuthFromCookies]);

  const handleLogout = () => {
    document.cookie = "token=; max-age=0; path=/;";
    document.cookie = "username=; max-age=0; path=/;";
    document.cookie = "role=; max-age=0; path=/;";
    setAuth({
      username: null,
      isAuthenticated: false,
      isLoading: false,
    });

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("authChange"));
  };

  if (auth.isLoading) {
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
              <div className="w-24 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

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
                <LogoutButton handleLogoutAuth={handleLogout} />
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
            <LogoutButton handleLogoutAuth={handleLogout} />
          )}
        </div>
      )}
    </nav>
  );
}
