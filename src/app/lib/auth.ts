'use server'; // Enables server-side imports of next/headers

import { cookies as serverCookies } from "next/headers";

// For client-side detection
const isClient = typeof window !== "undefined";

// Get cookie value from document.cookie (client)
function getClientCookie(name: string): string | null {
  if (!isClient) return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// Get cookie value from next/headers (server)
export async function getServerCookie(name: string): Promise<string | null> {
  const cookieStore = await serverCookies();
  const cookie = cookieStore.get(name);
  return cookie?.value ?? null;
}

// Exported unified function
export async function getAuth() {
  if (isClient) {
    // Client side
    const token = getClientCookie("token");
    const username = getClientCookie("username");
    const role = getClientCookie("role");
    return {
      token,
      username,
      isAuthenticated: !!token,
      role: role || null,
    };
  } else {
    // Server side
    const token = await getServerCookie("token");
    const username = await getServerCookie("username");
    const role = await getServerCookie("role");
    return {
      token,
      username,
      isAuthenticated: !!token,
      role: role || null,
    };
  }
}


export async function logout() {
  if (isClient) {
    // Client-side: clear cookies by setting expiration date in the past
    document.cookie = "token=; max-age=0; path=/;";
    document.cookie = "username=; max-age=0; path=/;";
    document.cookie = "role=; max-age=0; path=/;";
  } else {
    // Server-side: clear cookies by setting expiration date in the past
    const cookieStore = await serverCookies();
    cookieStore.delete('token');
    cookieStore.delete('username');
    cookieStore.delete('role');
  }
}