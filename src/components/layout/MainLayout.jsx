// src/components/layout/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks.js';
import { useAppSelector } from '../../app/hooks.js';
import { setCategoryFilter } from '../../features/ui/uiSlice.js';
import Header from './Header';
import TopFilters from './TopFilters.jsx';
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
      <Header variant="main" />
      {showTopFilters && <TopFilters />}
      <div
        className={`${styles.pageContainer} ${styles.pageBody} ${showSidebar ? styles.withSidebar : ''}`}
      >
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
    </div>
  );
};

export default MainLayout;
