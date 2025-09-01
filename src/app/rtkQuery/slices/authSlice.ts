// store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null;
  username: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // To track if we've loaded from cookies
};

// Helper functions for cookies
const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, maxAge: number = 7 * 24 * 60 * 60) => {
  if (typeof window === 'undefined') return;
  const isProd = process.env.NODE_ENV === 'production';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; ${
    isProd ? 'Secure;' : ''
  } SameSite=Lax`;
};

const removeCookie = (name: string) => {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=; max-age=0; path=/;`;
};

const initialState: AuthState = {
  token: null,
  username: null,
  role: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      // Load auth state from cookies
      const token = getCookie('token');
      const username = getCookie('username');
      const role = getCookie('role');
      
      state.token = token;
      state.username = username;
      state.role = role;
      state.isAuthenticated = !!token;
      state.isInitialized = true;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; username: string; role: string }>) => {
      const { token, username, role } = action.payload;
      
      // Update state
      state.token = token;
      state.username = username;
      state.role = role;
      state.isAuthenticated = true;
      state.isInitialized = true;
      
      // Save to cookies
      setCookie('token', token);
      setCookie('username', username);
      setCookie('role', role);
    },
    logout: (state) => {
      // Clear state
      state.token = null;
      state.username = null;
      state.role = null;
      state.isAuthenticated = false;
      
      // Clear cookies
      removeCookie('token');
      removeCookie('username');
      removeCookie('role');
    },
  },
});

export const { initializeAuth, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;