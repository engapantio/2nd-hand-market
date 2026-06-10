// src/features/maintenance/maintenanceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState: {
    rows: [],
  },
  reducers: {
    setInitialRows(state, action) {
      if (state.rows.length === 0) {
        state.rows = action.payload.map((p) => ({ ...p, checked: false }));
      }
    },
    addRow(state, action) {
      const exists = state.rows.some((r) => r.id === action.payload.id);
      if (!exists) {
        state.rows.push({ ...action.payload, checked: false });
      }
    },
    toggleChecked(state, action) {
      const row = state.rows.find((r) => r.id === action.payload);
      if (row) row.checked = !row.checked;
    },
    toggleAllChecked(state, action) {
      const shouldCheck = action.payload;
      state.rows.forEach((row) => {
        row.checked = shouldCheck;
      });
    },
    clearRows(state) {
      state.rows = [];
    },
  },
});

export const { setInitialRows, addRow, toggleChecked, toggleAllChecked, clearRows } =
  maintenanceSlice.actions;

export const selectMaintenanceRows = (state) => state.maintenance.rows;

export default maintenanceSlice.reducer;
