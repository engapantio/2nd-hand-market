// src/components/products/ProductsGrid.jsx
// import { useState } from 'react';
// import { useAppSelector } from '../../app/hooks';
// import { selectSearchQuery } from '../../features/ui/uiSlice';
// import { useGetProductsQuery } from '../../api/dummyApi.js';
import ProductCard from './ProductCard';
import useInfiniteProducts from '../../hooks/useInfiniteProducts';
import styles from '../../styles/productsGrid.module.css';

// const PAGE_SIZE = 8;

// const mapTopFilterToCategory = (filter) => {
//   switch (filter) {
//     case 'Women':
//       return 'womens-dresses';
//     case 'Men':
//       return 'mens-shirts';
//     default:
//       return undefined;
//   }
// };

const ProductsGrid = ({ sorting, activeFilters }) => {
  const { items, sentinelRef, hasMore, isFetching, isLoading } = useInfiniteProducts({
    sorting,
    activeFilters,
  });

  // const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // const category = mapTopFilterToCategory(topFilter);
  // const searchQuery = useAppSelector(selectSearchQuery);

  // const queryParams = {
  //   limit: PAGE_SIZE,
  //   sortBy: 'price',
  //   order: sorting === 'asc' ? 'asc' : 'desc',
  //   category,
  //   ...(searchQuery ? { q: searchQuery } : {}),
  // };

  // const { data, isLoading, isError } = useGetProductsQuery(queryParams, {
  //   refetchOnMountOrArgChange: true,
  // });

  if (isLoading) return <div className={styles.loading}>Loading products…</div>;
  // if (isError) return <div>Failed to load products.</div>;

  return (
    <div>
      <div className={styles.grid}>
        {items.map((p) => (
          <ProductCard key={`product-${p.id}`} product={p} />
        ))}
      </div>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />

      {isFetching && <div className={styles.loading}>Loading more…</div>}
      {!hasMore && items.length > 0 && <div className={styles.endMessage}>No more products.</div>}
    </div>
  );
};

export default ProductsGrid;
