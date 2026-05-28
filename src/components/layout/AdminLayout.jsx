// src/components/layout/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import styles from '../../styles/layout.module.css';

const AdminLayout = () => (
  <div className={styles.app}>
    <Header variant="admin" />
    <div className={`${styles.adminContainer} page-container`}>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
