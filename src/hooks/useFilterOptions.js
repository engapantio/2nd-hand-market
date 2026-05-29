// src/hooks/useFilterOptions.js
import { useMemo } from 'react';
import { useGetCategoryProductsQuery } from '../api/dummyApi.js';

export default function useFilterOptions(category) {
  // Fires silently under the hood; cached by RTK Query — no spinner shown
  const { data } = useGetCategoryProductsQuery(
    { category: category || 'womens-dresses', limit: 100 },
    { skip: !category }
  );

  return useMemo(() => {
    if (!data?.products) return { brands: [], conditions: [], priceMax: 500 };

    const brands = [...new Set(data.products.map((p) => p.brand).filter(Boolean))].sort();

    const conditions = [...new Set(data.products.map((p) => p.availabilityStatus).filter(Boolean))];

    const priceMax = Math.ceil(Math.max(...data.products.map((p) => p.price)));

    return { brands, conditions, priceMax };
  }, [data]);
}
