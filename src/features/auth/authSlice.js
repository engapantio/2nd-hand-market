// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { dummyApi } from '../../api/dummyApi.js';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(dummyApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = {
        id: payload.id,
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };
      state.token = payload.accessToken;
    });
  },
});

export const { logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export default authSlice.reducer;
