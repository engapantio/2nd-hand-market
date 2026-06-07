// src/components/layout/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useAppDispatch } from '../../app/hooks.js';
import { useAppSelector } from '../../app/hooks.js';
import { setCategoryFilter } from '../../features/ui/uiSlice.js';
import Header from './header/Header.jsx';
import TopFilters from './TopFilters.jsx';
import Loader from './../common/Loader';
import Sidebar from './Sidebar';
import styles from '../../styles/layout.module.css';

const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { activeFilters } = useAppSelector((s) => s.ui);
  const showSidebar = pathname === '/';
  const showTopFilters = pathname === '/' || pathname === '/reserved' || pathname === '/purchased';

  return (
    <div className={styles.app}>
      <Suspense fallback={Loader}>
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
