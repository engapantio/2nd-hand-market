import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from '../api/dummyApi.js';
import authReducer from '../features/auth/authSlice.js';
import uiReducer from '../features/ui/uiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dummyApi.middleware),
});
