// src/features/ui/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginOpen: false,
  activeProductsTab: 'reserved',
  searchQuery: '',
  activeFilters: {
    topFilter: '',
    categoryLabel: '',
    subcategoryLabel: '',
    categorySlug: '',
    brand: '',
    priceMin: 0,
    priceMax: 9999,
    condition: '', // 'In Stock' | 'Low Stock' | 'Out of Stock'  — client-side
    sale: false,
  },
  // grey pills — derived from activeFilters but stored explicitly for ordering
  filterPills: [],
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
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setTopFilter(state, { payload: filter }) {
      state.activeFilters.topFilter = filter;
      state.activeFilters.category = '';
      state.filterPills = state.filterPills
        .filter((p) => p.key !== 'topFilter' && p.key !== 'category')
        .concat(filter ? [{ key: 'topFilter', label: filter }] : []);
    },

    setCategoryFilter(state, { payload: { categoryLabel, subcategoryLabel, categorySlug } }) {
      state.activeFilters.categorySlug = categorySlug || '';
      state.activeFilters.categoryLabel = categoryLabel || '';
      state.activeFilters.subcategoryLabel = subcategoryLabel;
      const pillLabel = subcategoryLabel || categoryLabel || '';
      state.filterPills = state.filterPills.filter((pill) => pill.key !== 'category');
      if (pillLabel) {
        state.filterPills.push({
          key: 'category',
          label: pillLabel,
        });
      }
    },

    setBrandFilter(state, { payload: brand }) {
      state.activeFilters.brand = brand;
      state.filterPills = state.filterPills
        .filter((p) => p.key !== 'brand')
        .concat(brand ? [{ key: 'brand', label: brand }] : []);
    },

    setPriceFilter(state, { payload: { min, max } }) {
      state.activeFilters.priceMin = min;
      state.activeFilters.priceMax = max;
      const label = `$${min}–$${max}`;
      state.filterPills = state.filterPills
        .filter((p) => p.key !== 'price')
        .concat([{ key: 'price', label }]);
    },

    setConditionFilter(state, { payload: condition }) {
      state.activeFilters.condition = condition;
      state.filterPills = state.filterPills
        .filter((p) => p.key !== 'condition')
        .concat(condition ? [{ key: 'condition', label: condition }] : []);
    },
    setSaleFilter(state, action) {
      state.activeFilters.sale = action.payload;
    },

    removeFilter(state, { payload: key }) {
      if (key === 'topFilter') state.activeFilters.topFilter = '';
      if (key === 'category') {
        state.activeFilters.categorySlug = '';
        state.activeFilters.categoryLabel = '';
        state.activeFilters.subcategoryLabel = '';

        state.filterPills = state.filterPills.filter((pill) => pill.key !== 'category');
        return;
      }

      if (key === 'brand') state.activeFilters.brand = '';
      if (key === 'condition') state.activeFilters.condition = '';
      if (key === 'price') {
        state.activeFilters.priceMin = 0;
        state.activeFilters.priceMax = 9999;
      }
      state.filterPills = state.filterPills.filter((p) => p.key !== key);
    },
  },
});

export const {
  openLogin,
  closeLogin,
  setActiveProductsTab,
  setSearchQuery,
  setTopFilter,
  setCategoryFilter,
  setBrandFilter,
  setPriceFilter,
  setConditionFilter,
  setSaleFilter,
  removeFilter,
} = uiSlice.actions;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export default uiSlice.reducer;
