// src/features/products/productsSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const shops = [
  {
    id: 'restyle',
    name: 'ReStyle Hub',
    address: '23A Gran Via',
    workHours: 'MO–FR: 9AM–8PM | SA–SU: 9AM–8PM',
  },
  {
    id: 'trend',
    name: 'TrendTraders',
    address: 'Strada degli Arcobaleni',
    workHours: 'MO–FR: 9AM–5PM | SA–SU: 11AM–5PM',
  },
];

const getNextTuesdayReservation = () => {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const daysUntilNextTuesday = (2 - day + 7) % 7 || 7;
  const start = new Date(now);
  start.setDate(now.getDate() + daysUntilNextTuesday);
  const end = new Date(start);
  end.setDate(start.getDate() + 3);
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
};

const initialState = {
  reserved: [], // {id, product, shop, reservation, createdAt}
  purchased: [], // {id, product, shop, purchaseTime}
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleReserved(state, action) {
      const product = action.payload;
      const existing = state.reserved.find((r) => r.product.id === product.id);
      if (existing) {
        state.reserved = state.reserved.filter((r) => r.product.id !== product.id);
        return;
      }
      const reservation = getNextTuesdayReservation();
      const shop = shops[Math.floor(Math.random() * shops.length)];
      state.reserved.push({
        id: nanoid(),
        product,
        shop,
        reservation,
        createdAt: new Date().toISOString(),
      });
    },
    addPurchased(state, action) {
      const product = action.payload;
      const shop = shops[Math.floor(Math.random() * shops.length)];
      const purchaseTime = new Date().toISOString();
      const already = state.purchased.find((p) => p.product.id === product.id);
      if (!already) {
        state.purchased.push({
          id: nanoid(),
          product,
          shop,
          purchaseTime,
        });
      }
    },
  },
});

export const { toggleReserved, addPurchased } = productsSlice.actions;
export default productsSlice.reducer;
export const selectReserved = (state) => state.products.reserved;
export const selectPurchased = (state) => state.products.purchased;
