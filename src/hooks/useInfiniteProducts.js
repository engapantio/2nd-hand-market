import { useEffect, useMemo, useRef, useState, useEffectEvent } from 'react';
import { useGetProductsQuery } from '../api/dummyApi.js';
import { useAppSelector } from '../app/hooks';
import { selectSearchQuery } from '../features/ui/uiSlice';
import { TOP_FILTER_MAP } from '../constants/categoryMap';

export default function useInfiniteProducts({ sorting, activeFilters }) {
  const searchQuery = useAppSelector(selectSearchQuery);
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const limit = 8;
  const isNewFilter = activeFilters.topFilter === 'New';

  const queryArgs = useMemo(() => {
    const { topFilter, categorySlug, brand } = activeFilters;
    if (isNewFilter) {
      return {
        q: '',
        category: '',
        limit: 0,
        skip: 0,
        sortBy: 'price',
        order: sorting === 'desc' ? 'desc' : 'asc',
      };
    }

    if (categorySlug) {
      return {
        category: categorySlug,
        limit,
        skip: page * limit,
        sortBy: 'price',
        order: sorting === 'desc' ? 'desc' : 'asc',
        q: '',
      };
    }
    if (topFilter && topFilter !== 'New' && TOP_FILTER_MAP[topFilter]?.length) {
      return {
        category: TOP_FILTER_MAP[topFilter][0],
        limit,
        skip: page * limit,
        sortBy: 'price',
        order: sorting === 'desc' ? 'desc' : 'asc',
        q: '',
      };
    }
    const q = brand || searchQuery || '';
    return {
      q,
      category: '',
      limit,
      skip: page * limit,
      sortBy: 'price',
      order: sorting === 'desc' ? 'desc' : 'asc',
    };
  }, [activeFilters, searchQuery, page, sorting, isNewFilter]);

  const { data, isFetching, isLoading } = useGetProductsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  const filtersKey = JSON.stringify({ searchQuery, sorting, activeFilters });
  useEffect(() => {
    setPage(0);
    setItems([]);
    setHasMore(true);
  }, [filtersKey]);

  useEffect(() => {
    if (!data?.products) return;

    if (isNewFilter) {
      const months = 26;
      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - months);
      let filtered = data.products.filter((p) => {
        const created = p.meta?.createdAt;
        if (!created) return false;
        const ts = new Date(created) > cutoff;
        return ts;
      });
      setItems(filtered);
      setHasMore(false);
      return;
    }

    let filtered = data.products;

    if (activeFilters?.condition) {
      filtered = filtered.filter((p) => p.availabilityStatus === activeFilters.condition);
    }
    if (activeFilters?.topFilter === 'New') {
      const cutoff = Date.now() - 60 * 24 * 60 * 60 * 1000; // 60 days
      filtered = filtered.filter((p) => new Date(p.meta?.createdAt).getTime() > cutoff);
    }
    if (activeFilters.sale) {
      filtered = filtered.filter((p) => p.discountPercentage > 0);
    }
    if (activeFilters?.priceMin > 0 || activeFilters?.priceMax < 9999) {
      filtered = filtered.filter(
        (p) => p.price >= activeFilters.priceMin && p.price <= activeFilters.priceMax
      );
    }

    setItems((prev) => {
      if (page === 0) return filtered;
      const existingIds = new Set(prev.map((p) => p.id));
      const fresh = filtered.filter((p) => !existingIds.has(p.id));
      return [...prev, ...fresh];
    });

    const nextCursor = page * limit + data.products.length;
    const reachedEnd = data.products.length < limit || nextCursor >= data.total;

    setHasMore(!reachedEnd);
  }, [data, page, activeFilters, isNewFilter]);

  const loadNextPage = useEffectEvent(() => {
    if (!isFetching && hasMore) {
      setPage((current) => current + 1);
    }
  });

  useEffect(() => {
    if (!sentinelRef.current || !hasMore || isFetching || isNewFilter) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadNextPage();
      },
      {
        root: null,
        rootMargin: '300px',
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, isFetching, isNewFilter, loadNextPage]);

  return {
    items,
    sentinelRef,
    hasMore,
    isFetching,
    isLoading,
  };
}
