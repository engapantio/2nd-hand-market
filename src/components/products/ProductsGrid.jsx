// src/components/products/ProductsGrid.jsx
import { useState } from 'react';
import { useGetProductsQuery } from '../../api/dummyApi.js';
import ProductCard from './ProductCard';
import styles from '../../styles/productsGrid.module.css';

const PAGE_SIZE = 8;

const mapTopFilterToCategory = (filter) => {
  switch (filter) {
    case 'Women':
      return 'womens-dresses';
    case 'Men':
      return 'mens-shirts';
    default:
      return undefined;
  }
};

const ProductsGrid = ({ topFilter, sorting }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const category = mapTopFilterToCategory(topFilter);

  const { data, isLoading, isError } = useGetProductsQuery(
    {
      limit: visibleCount,
      sortBy: 'price',
      order: sorting === 'asc' ? 'asc' : 'desc',
      category,
    },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) return <div>Loading products…</div>;
  if (isError) return <div>Failed to load products.</div>;

  const products = data?.products ?? [];

  const handleLoadMore = () => {
    if (visibleCount < data.total) {
      setVisibleCount((c) => c + 4);
    }
  };

  return (
    <div>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {visibleCount < (data?.total || 0) && (
        <button type="button" className={styles.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default ProductsGrid;
