// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import styles from '../../styles/layout.module.css';

const AdminLayout = () => (
  <div className={styles.app}>
    <AdminHeader />
    <div className={`${styles.adminContainer} page-container`}>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
