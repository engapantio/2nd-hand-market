// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addPurchased } from '../products/productsSlice';
import { toggleReserved } from '../products/productsSlice';

const initialState = { reservedCount: 0, purchasedCount: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleReserved, (state, action) => {
        const product = action.payload;
        // assume products slice already added/removed
        const wasReserved = action.meta?.arg?.wasReserved;
        // simpler: recalc from products slice
      })
      .addCase(addPurchased, (state) => {
        state.purchasedCount += 1;
      });
  },
});

// Better: derive counts from products slice selectors instead of duplicating
export default cartSlice.reducer;

// selectors
export const selectReservedCount = (state) => state.products.reserved.length;
export const selectPurchasedCount = (state) => state.products.purchased.length;
