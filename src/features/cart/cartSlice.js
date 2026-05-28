// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {},
});

export default cartSlice.reducer;

// Derived counts — read directly from products slice, no duplication
export const selectReservedCount = (state) => state.products.reserved.length;
export const selectPurchasedCount = (state) => state.products.purchased.length;
