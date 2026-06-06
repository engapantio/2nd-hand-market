// src/components/products/ProductsGrid.jsx
import ProductCard from './ProductCard';
import useInfiniteProducts from '../../hooks/useInfiniteProducts';
import Loader from '../common/Loader.jsx';
import styles from '../../styles/productsGrid.module.css';

const ProductsGrid = ({ sorting, activeFilters }) => {
  const { items, sentinelRef, hasMore, isFetching, isLoading } = useInfiniteProducts({
    sorting,
    activeFilters,
  });

  if (isLoading) return <div className={styles.loading}>Loading products…</div>;

  return (
    <div>
      <ul className={styles.grid}>
        {items.map((p, i) => (
          <ProductCard key={`product-${p.id}`} product={p} isFirst={i === 0} />
        ))}
      </ul>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />

      {/* {isFetching && <div className={styles.loading}>Loading more…</div>} */}
      {isFetching && <Loader className={styles.loading} />}
      {!hasMore && items.length > 0 && <div className={styles.endMessage}>No more products.</div>}
    </div>
  );
};

export default ProductsGrid;
