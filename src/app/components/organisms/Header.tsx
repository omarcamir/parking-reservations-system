"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import Logo from "../atoms/Logo";
import LoginButton from "../atoms/LoginButton";
import LogoutButton from "../atoms/LogoutButton";
import { usePathname } from "next/navigation";
import TogglerBtn from "../atoms/TogglerBtn";
import { navLinks } from "../utils/paths";

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
    role: null as string | null,
  });
   const menuRef = useRef<HTMLDivElement | null>(null); // Reference to the entire header


  // Function to update auth state from cookies
  const updateAuthFromCookies = useCallback(() => {
    const token = getCookie("token");
    const username = getCookie("username");
    const role = getCookie("role");

    setAuth({
      username,
      isAuthenticated: !!token,
      isLoading: false,
      role: role!,
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
      role:null
    });

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("authChange"));
  };

// Close the mobile menu when clicking outside of the header or menu
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) // Check if click is outside the entire header
    ) {
      setIsOpen(false); // Close menu
    }
  };

  useEffect(() => {
    // Add event listener to close menu when clicking outside the header
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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
   /* const filteredLinks = navLinks.filter((link) => {
    if (!auth.isAuthenticated) {
      return link.role === undefined; // Show only public links when unauthenticated
    }
    return link.role === undefined || link.role === auth.role; // Show links matching the user's role
  }); */

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
            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-main-color focus:outline-none"
              aria-label="Toggle Menu"
            >
              ☰
            </button> */}
            <TogglerBtn toggleSidebar= {() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div ref={menuRef} className="lg:hidden bg-main-color px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              className="block text-white hover:text-accent-color"
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
