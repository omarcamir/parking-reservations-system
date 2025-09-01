import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { Gates } from "./services/Gates";
import { Zones } from "./services/Zones";
import { Tickets } from "./services/Tickets";
import { Login } from "./services/auth";
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [Gates.reducerPath]: Gates.reducer,
    [Zones.reducerPath]: Zones.reducer,
    [Tickets.reducerPath]: Tickets.reducer,
    [Login.reducerPath]: Login.reducer,
     auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      Gates.middleware,
      Zones.middleware,
      Tickets.middleware,
      Login.middleware,
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

