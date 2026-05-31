// src/features/products/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { pickRandomShop, getNextWeekReservationRange } from '../../constants/shopCatalog.js';

const initialState = {
  reserved: [],
  purchased: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleReserved(state, action) {
      const product = action.payload;
      const existingIndex = state.reserved.findIndex((r) => r.product.id === product.id);
      if (existingIndex !== -1) {
        state.reserved.splice(existingIndex, 1);
      } else {
        const shop = pickRandomShop();
        const reservedRange = getNextWeekReservationRange();

        state.reserved.push({
          product,
          shopId: shop.id,
          shopName: shop.name,
          shopLocation: shop.location,
          workHours: shop.workHours,
          deliveryTime: shop.deliveryTime,
          freeShippingFrom: shop.freeShippingFrom,
          reservedRange,
        });
      }
    },
    addPurchased(state, action) {
      const product = action.payload;
      const alreadyPurchased = state.purchased.some((p) => p.product.id === product.id);
      if (alreadyPurchased) return;

      const existingReservation = state.reserved.find((r) => r.product.id === product.id);
      const shop = existingReservation
        ? {
            id: existingReservation.shopId,
            name: existingReservation.shopName,
            location: existingReservation.shopLocation,
            workHours: existingReservation.workHours,
            deliveryTime: existingReservation.deliveryTime,
            freeShippingFrom: existingReservation.freeShippingFrom,
          }
        : pickRandomShop();

      state.purchased.push({
        product,
        shopId: shop.id,
        shopName: shop.name,
        shopLocation: shop.location,
        workHours: shop.workHours,
        deliveryTime: shop.deliveryTime,
        freeShippingFrom: shop.freeShippingFrom,
        purchaseDate: new Date().toISOString(),
      });
    },
  },
});

export const { toggleReserved, addPurchased } = productsSlice.actions;
export default productsSlice.reducer;
export const selectReserved = (state) => state.products.reserved;
export const selectPurchased = (state) => state.products.purchased;
export const selectReservedCount = (state) => state.products.reserved.length;
export const selectPurchasedCount = (state) => state.products.purchased.length;
