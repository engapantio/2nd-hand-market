// src/pages/HomePage.jsx
import { useState, useMemo } from 'react';
import { SIDEBAR_CATEGORIES } from '../constants/categoryMap';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import FilterPills from '../components/common/FilterPills';
import DropdownFilter from '../components/common/DropdownFilter.jsx';
import ProductsGrid from '../components/products/ProductsGrid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setBrandFilter,
  setPriceFilter,
  setConditionFilter,
  setSaleFilter,
  setCategoryFilter,
  removeFilter,
} from '../features/ui/uiSlice';
import useFilterOptions from '../hooks/useFilterOptions';
import styles from '../styles/home.module.css';

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

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { activeFilters, filterPills } = useAppSelector((s) => s.ui);
  const { brands, conditions, priceMax } = useFilterOptions(activeFilters.categorySlug);
  const [sorting, setSorting] = useState('asc');

  const isSaleOn = activeFilters.sale;
  const breadcrumbs = useMemo(() => {
    const crumbs = ['Home'];
    if (activeFilters.topFilter) {
      crumbs.push(activeFilters.topFilter);
    }
    if (activeFilters.categoryLabel) {
      crumbs.push(activeFilters.categoryLabel);
    }
    if (activeFilters.subcategoryLabel) {
      crumbs.push(activeFilters.subcategoryLabel);
    }
    return crumbs;
  }, [activeFilters.topFilter, activeFilters.categoryLabel, activeFilters.subcategoryLabel]);

  const flatCategories = useMemo(() => flattenCategories(), []);
  const activeCategoryOption = useMemo(() => {
    if (activeFilters.subcategoryLabel) {
      return flatCategories.find((opt) => opt.slug === activeFilters.categorySlug) ?? null;
    }
    if (activeFilters.categoryLabel) {
      return (
        flatCategories.find(
          (opt) => opt.categoryLabel === activeFilters.categoryLabel && !opt.subcategoryLabel
        ) ?? null
      );
    }
    return null;
  }, [
    flatCategories,
    activeFilters.categorySlug,
    activeFilters.categoryLabel,
    activeFilters.subcategoryLabel,
  ]);

  const handleCategoryDropdownChange = (labelOrEmpty) => {
    const option = flatCategories.find((opt) => opt.label === labelOrEmpty) || null;
    if (!option) {
      dispatch(
        setCategoryFilter({
          categorySlug: '',
          categoryLabel: '',
          subcategoryLabel: '',
        })
      );
      return;
    }
    dispatch(
      setCategoryFilter({
        categorySlug: option.slug,
        categoryLabel: option.categoryLabel,
        subcategoryLabel: option.subcategoryLabel,
      })
    );
  };

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
            onChange={handleCategoryDropdownChange}
          />
        </div>
        <div className={styles.dropdownRow}>
          {/* Color / Size / Shop → no DummyJSON data: render dropdowns but mark them as decorative */}
          <DropdownFilter label="Color" options={[]} disabled />
          <DropdownFilter label="Size" options={[]} disabled />
          <DropdownFilter
            label="Brand"
            options={brands}
            value={activeFilters.brand}
            onChange={(v) => dispatch(setBrandFilter(v))}
          />
          <DropdownFilter
            label="Price"
            type="range"
            min={0}
            max={priceMax || 500}
            value={[activeFilters.priceMin, activeFilters.priceMax]}
            onChange={([min, max]) => dispatch(setPriceFilter({ min, max }))}
          />
          <DropdownFilter
            label="Condition"
            options={conditions}
            value={activeFilters.condition}
            onChange={(v) => dispatch(setConditionFilter(v))}
          />
          <DropdownFilter
            label="Shop"
            options={['ReStyle Hub', 'TrendTraders']}
            onChange={(v) => {
              /* purely visual, no API mapping */
            }}
          />
          <button
            type="button"
            className={`${styles.salePill} ${isSaleOn ? styles.saleActive : styles.saleInactive}`}
            onClick={() => dispatch(setSaleFilter(!isSaleOn))}
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
