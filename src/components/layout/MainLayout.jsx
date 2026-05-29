// src/components/layout/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks.js';
import { useAppSelector } from '../../app/hooks.js';
import { setCategoryFilter } from '../../features/ui/uiSlice.js';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../../styles/layout.module.css';

const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { activeFilters } = useAppSelector((s) => s.ui);
  const showSidebar = pathname === '/';

  return (
    <div className={styles.app}>
      <Header variant="main" />
      <div className={`${styles.pageContainer} ${styles.pageBody} ${showSidebar ? styles.withSidebar : ''}`}>
        {showSidebar && (
          <Sidebar
            onCategorySelect={(label, slug) => dispatch(setCategoryFilter({ label, slug }))}
            activeSlug={activeFilters.category}
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
