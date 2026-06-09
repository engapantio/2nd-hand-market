// src/components/layout/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useAppDispatch } from '../app/hooks.js';
import { useAppSelector } from '../app/hooks.js';
import { setCategoryFilter } from '../features/ui/uiSlice.js';
import Header from '../components/Header/Header.jsx';
import TopFilters from '../components/widgets/TopFilters/TopFilters.jsx';
import Loader from '../components/common/Loader/Loader.jsx';
import Sidebar from '../components/widgets/Sidebar/Sidebar.jsx';
import styles from './layout.module.css';

const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { activeFilters } = useAppSelector((s) => s.ui);
  const showSidebar = pathname === '/';
  const showTopFilters = pathname === '/';

  return (
    <div className={styles.app}>
      <Suspense fallback={<Loader />}>
        <Header variant="main" />
        {showTopFilters && <TopFilters />}
        <div className={`${styles.pageContainer} ${pathname === '/' ? styles.homeContainer : ''}`}>
          {showSidebar && (
            <Sidebar
              onCategorySelect={(payload) => dispatch(setCategoryFilter(payload))}
              activeSlug={activeFilters.categorySlug}
            />
          )}
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </Suspense>
    </div>
  );
};

export default MainLayout;
