// src/pages/HomePage.jsx
import { useState, useMemo } from 'react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import FilterPills from '../components/common/FilterPills';
import DropdownFilter from '../components/common/DropdownFilter.jsx';
import ProductsGrid from '../components/products/ProductsGrid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setTopFilter,
  setBrandFilter,
  setPriceFilter,
  setConditionFilter,
  removeFilter,
} from '../features/ui/uiSlice';
import useFilterOptions from '../hooks/useFilterOptions';
import styles from '../styles/home.module.css';

const topFilters = ['Women', 'Men', 'Unisex', 'Children', 'New'];

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { activeFilters, filterPills } = useAppSelector((s) => s.ui);
  const { brands, conditions, priceMax } = useFilterOptions(activeFilters.category);
  const [sorting, setSorting] = useState('asc'); // 'asc' | 'desc'

  const breadcrumbs = useMemo(() => {
    const crumbs = ['Home'];
    if (activeFilters.topFilter) {
      crumbs.push(activeFilters.topFilter);
    }
    if (activeFilters.category) {
      // find human label from SIDEBAR_CATEGORIES
      crumbs.push(activeFilters.category);
    }
    return crumbs;
  }, [activeFilters]);

  return (
    <div className={styles.wrapper}>
      {/* ── Top filters ────────────────────────────────────────── */}
      <div className={styles.topFilters}>
        {topFilters.map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.topFilter} ${activeFilters.topFilter === f ? styles.active : ''}`}
            onClick={() => dispatch(setTopFilter(activeFilters.topFilter === f ? '' : f))}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <main>
          <Breadcrumbs items={breadcrumbs} />

          {/* ── Dropdown filters ──────────────────────────────── */}
          <div className={styles.dropdownRow}>
            <DropdownFilter
              label="Brand"
              options={brands}
              value={activeFilters.brand}
              onChange={(v) => dispatch(setBrandFilter(v))}
            />
            <DropdownFilter
              label="Condition"
              options={conditions}
              value={activeFilters.condition}
              onChange={(v) => dispatch(setConditionFilter(v))}
            />
            <DropdownFilter
              label="Price"
              type="range"
              min={0}
              max={priceMax || 500}
              value={[activeFilters.priceMin, activeFilters.priceMax]}
              onChange={([min, max]) => dispatch(setPriceFilter({ min, max }))}
            />
            {/* Color / Size / Shop → no DummyJSON data: render dropdowns
                but mark them as decorative / show empty options for now */}
            <DropdownFilter label="Color" options={[]} />
            <DropdownFilter label="Size" options={[]} />
            <DropdownFilter
              label="Shop"
              options={['ReStyle Hub', 'TrendTraders']}
              onChange={(v) => {
                /* purely visual, no API mapping */
              }}
            />
            <button className={styles.salePill}>
              Sale <span>×</span>
            </button>
          </div>

          {/* ── Grey pills ───────────────────────────────────── */}
          <FilterPills pills={filterPills} onRemove={(key) => dispatch(removeFilter(key))} />

          {/* ── Sort ─────────────────────────────────────────── */}
          <div className={styles.sortRow}>
            <span>Sort by:</span>
            <button
              className={sorting === 'asc' ? styles.sortActive : ''}
              onClick={() => setSorting('asc')}
            >
              Ascending price
            </button>
            <button
              className={sorting === 'desc' ? styles.sortActive : ''}
              onClick={() => setSorting('desc')}
            >
              Descending price
            </button>
          </div>

          <ProductsGrid sorting={sorting} activeFilters={activeFilters} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
