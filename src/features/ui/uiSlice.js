import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catalogView: 'grid',
  isSidebarOpen: false,
  activeCategory: '',
  sortBy: 'title',
  order: 'asc',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCatalogView: (state, action) => {
      state.catalogView = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },
  },
});

export const { setCatalogView, toggleSidebar, setActiveCategory, setSort } = uiSlice.actions;

export default uiSlice.reducer;
