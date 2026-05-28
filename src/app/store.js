// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from '../api/dummyApi.js';
import { loadSessionState, saveSessionState } from './persistSession';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';

const preloadedSession = loadSessionState();

export const store = configureStore({
  reducer: {
    [dummyApi.reducerPath]: dummyApi.reducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefault) => getDefault().concat(dummyApi.middleware),
  preloadedState: preloadedSession,
});

store.subscribe(() => {
  saveSessionState(store.getState());
});
