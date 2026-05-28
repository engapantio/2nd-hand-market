// src/pages/HomePage.jsx
import { useState } from 'react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ProductsGrid from '../components/products/ProductsGrid';
import styles from '../styles/home.module.css';

const topFilters = ['Women', 'Men', 'Unisex', 'Children', 'New'];

const HomePage = () => {
  const [activeTopFilter, setActiveTopFilter] = useState('Women');
  const [breadcrumbs, setBreadcrumbs] = useState(['Home', 'Women']);
  const [sorting, setSorting] = useState('asc'); // 'asc' | 'desc'

  const handleTopFilterClick = (filter) => {
    setActiveTopFilter(filter);
    setBreadcrumbs(['Home', filter]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topFilters}>
        {topFilters.map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.topFilter} ${activeTopFilter === f ? styles.active : ''}`}
            onClick={() => handleTopFilterClick(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <Breadcrumbs items={breadcrumbs} />

      {/* dropdown filters + pills + sorting skipped for brevity but can be wired similarly */}

      <div className={styles.sortRow}>
        <span>Sort by:</span>
        <button
          type="button"
          className={sorting === 'asc' ? styles.sortActive : ''}
          onClick={() => setSorting('asc')}
        >
          Ascending price
        </button>
        <button
          type="button"
          className={sorting === 'desc' ? styles.sortActive : ''}
          onClick={() => setSorting('desc')}
        >
          Descending price
        </button>
      </div>

      <ProductsGrid topFilter={activeTopFilter} sorting={sorting} />
    </div>
  );
};

export default HomePage;
