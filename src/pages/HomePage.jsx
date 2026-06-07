// src/pages/HomePage.jsx
import { lazy } from 'react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import FilterPills from '../components/common/FilterPills';
import DropdownFilter from '../components/common/DropdownFilter.jsx';
import { useHomePageFilters } from '../hooks/useHomePageFilters';
import styles from '../styles/home.module.css';

const ProductsGrid = lazy(() => import('./../components/products/ProductsGrid'));

const HomePage = () => {
  const {
    breadcrumbs,
    flatCategories,
    activeCategoryOption,
    brands,
    conditions,
    priceMax,
    filterPills,
    isSaleOn,
    sorting,
    activeFilters,
    setSorting,
    handleCategoryChange,
    onBrandChange,
    onPriceChange,
    onConditionChange,
    onSaleToggle,
    onRemoveFilter,
  } = useHomePageFilters();

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <Breadcrumbs items={breadcrumbs} />
        <div className={styles.categoriesRow}>
          <DropdownFilter
            className={styles.dropdownItem}
            label={activeCategoryOption ? activeCategoryOption.label : 'Categories'}
            options={flatCategories.map((opt) => opt.label)}
            value={activeCategoryOption ? activeCategoryOption.label : ''}
            onChange={handleCategoryChange}
          />
        </div>
        <div className={styles.dropdownRow}>
          {/* Color / Size / Shop → no DummyJSON data: rendering dropdowns as decorative */}
          <DropdownFilter label="Color" options={[]} disabled />
          <DropdownFilter label="Size" options={[]} disabled />
          <DropdownFilter
            label="Brand"
            options={brands}
            value={activeFilters.brand}
            onChange={onBrandChange}
          />
          <DropdownFilter
            label="Price"
            type="range"
            min={0}
            max={priceMax || 500}
            value={[activeFilters.priceMin, activeFilters.priceMax]}
            onChange={onPriceChange}
          />
          <DropdownFilter
            label="Condition"
            options={conditions}
            value={activeFilters.condition}
            onChange={onConditionChange}
          />
          <DropdownFilter
            label="Shop"
            options={['ReStyle Hub', 'TrendTraders']}
            onChange={() => {
              /* purely visual, no API mapping */
            }}
          />
          <button
            type="button"
            className={`${styles.salePill} ${isSaleOn ? styles.saleActive : styles.saleInactive}`}
            onClick={onSaleToggle}
          >
            <span className={styles.saleLabel}>Sale</span>

            {isSaleOn && (
              <span className={styles.saleIcon} aria-hidden="true">
                <svg width={13} height={13}>
                  <use href="/sprite.svg#icon-dismiss-white" />
                </svg>
              </span>
            )}
          </button>
        </div>

        <FilterPills pills={filterPills} onRemove={onRemoveFilter} />

        <div className={styles.sortRow}>
          <span>Sort by:</span>
          <button
            className={`${styles.sortBtn} ${sorting === 'asc' ? styles.sortActive : ''}`}
            onClick={() => setSorting('asc')}
          >
            Ascending price
          </button>
          <button
            className={`${styles.sortBtn} ${sorting === 'desc' ? styles.sortActive : ''}`}
            onClick={() => setSorting('desc')}
          >
            Descending price
          </button>
        </div>

        <ProductsGrid
          sorting={sorting}
          activeFilters={{
            topFilter: activeFilters.topFilter,
            categorySlug: activeFilters.categorySlug,
            brand: activeFilters.brand,
            priceMin: activeFilters.priceMin,
            priceMax: activeFilters.priceMax,
            condition: activeFilters.condition,
            sale: activeFilters.sale,
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
