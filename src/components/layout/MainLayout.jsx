// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../../styles/layout.module.css';

const MainLayout = () => (
  <div className={styles.app}>
    <Header variant="main" />
    <div className={`${styles.pageContainer} page-container`}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  </div>
);

export default MainLayout;
