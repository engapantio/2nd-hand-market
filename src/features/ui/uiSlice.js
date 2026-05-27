// src/features/ui/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginOpen: false,
  activeProductsTab: 'reserved', // 'reserved' | 'purchased'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openLogin(state) {
      state.isLoginOpen = true;
    },
    closeLogin(state) {
      state.isLoginOpen = false;
    },
    setActiveProductsTab(state, action) {
      state.activeProductsTab = action.payload;
    },
  },
});

export const { openLogin, closeLogin, setActiveProductsTab } = uiSlice.actions;
export default uiSlice.reducer;
