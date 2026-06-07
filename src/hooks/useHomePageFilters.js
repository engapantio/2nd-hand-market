// src/hooks/useHomePageFilters.js
import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setBrandFilter,
  setPriceFilter,
  setConditionFilter,
  setSaleFilter,
  setCategoryFilter,
  removeFilter,
} from '../features/ui/uiSlice';
import useFilterOptions from './useFilterOptions';
import { SIDEBAR_CATEGORIES } from '../constants/categoryMap';

const flattenCategories = () =>
  SIDEBAR_CATEGORIES.flatMap((cat) =>
    cat.sub?.length
      ? cat.sub.map((s) => ({
          label: `${cat.label} / ${s.label}`,
          slug: s.slug,
          categoryLabel: cat.label,
          subcategoryLabel: s.label,
        }))
      : [{ label: cat.label, slug: cat.slug, categoryLabel: cat.label, subcategoryLabel: '' }]
  );

export function useHomePageFilters() {
  const dispatch = useAppDispatch();
  const { activeFilters, filterPills } = useAppSelector((s) => s.ui);
  const { brands, conditions, priceMax } = useFilterOptions(activeFilters.categorySlug);
  const [sorting, setSorting] = useState('asc');

  const flatCategories = useMemo(() => flattenCategories(), []);

  const activeCategoryOption = useMemo(() => {
    if (activeFilters.subcategoryLabel)
      return flatCategories.find((o) => o.slug === activeFilters.categorySlug) ?? null;
    if (activeFilters.categoryLabel)
      return (
        flatCategories.find(
          (o) => o.categoryLabel === activeFilters.categoryLabel && !o.subcategoryLabel
        ) ?? null
      );
    return null;
  }, [
    flatCategories,
    activeFilters.categorySlug,
    activeFilters.categoryLabel,
    activeFilters.subcategoryLabel,
  ]);

  const breadcrumbs = useMemo(() => {
    const crumbs = ['Home'];
    if (activeFilters.topFilter) crumbs.push(activeFilters.topFilter);
    if (activeFilters.categoryLabel) crumbs.push(activeFilters.categoryLabel);
    if (activeFilters.subcategoryLabel) crumbs.push(activeFilters.subcategoryLabel);
    return crumbs;
  }, [activeFilters.topFilter, activeFilters.categoryLabel, activeFilters.subcategoryLabel]);

  const handleCategoryChange = (labelOrEmpty) => {
    const option = flatCategories.find((o) => o.label === labelOrEmpty) || null;
    dispatch(
      setCategoryFilter(
        option
          ? {
              categorySlug: option.slug,
              categoryLabel: option.categoryLabel,
              subcategoryLabel: option.subcategoryLabel,
            }
          : { categorySlug: '', categoryLabel: '', subcategoryLabel: '' }
      )
    );
  };

  return {
    breadcrumbs,
    flatCategories,
    activeCategoryOption,
    brands,
    conditions,
    priceMax,
    filterPills,
    isSaleOn: activeFilters.sale,
    sorting,
    activeFilters,
    setSorting,
    handleCategoryChange,
    onBrandChange: (v) => dispatch(setBrandFilter(v)),
    onPriceChange: ([min, max]) => dispatch(setPriceFilter({ min, max })),
    onConditionChange: (v) => dispatch(setConditionFilter(v)),
    onSaleToggle: () => dispatch(setSaleFilter(!activeFilters.sale)),
    onRemoveFilter: (key) => dispatch(removeFilter(key)),
  };
}
