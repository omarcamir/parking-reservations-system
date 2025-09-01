// hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeAuth, loginSuccess, logout } from '../rtkQuery/slices/authSlice';
import { RootState } from '../rtkQuery/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  // Initialize auth state from cookies on first load
  useEffect(() => {
    if (!auth.isInitialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, auth.isInitialized]);

  const login = (token: string, username: string, role: string) => {
    dispatch(loginSuccess({ token, username, role }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    ...auth,
    login,
    logout: logoutUser,
    isLoading: !auth.isInitialized, // Loading until initialized
  };
};