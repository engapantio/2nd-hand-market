// src/routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/Home/HomePage.jsx'));
const ProductsTabsPage = lazy(() => import('../pages/ProductsTabsPage/ProductsTabsPage.jsx'));
const MaintenancePage = lazy(() => import('../pages/MaintenancePage/MaintenancePage.jsx'));
const UserManagementPage = lazy(() => import('../pages/UserManagementPage/UserManagementPage.jsx'));
const MainLayout = lazy(() => import('../layout/MainLayout.jsx'));
const AdminLayout = lazy(() => import('../layout/AdminLayout.jsx'));
const ProtectedRoute = lazy(() => import('./protectedRoute.jsx'));

export default function RoutesConfig() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/reserved" element={<ProductsTabsPage tab="reserved" />} />
        <Route path="/purchased" element={<ProductsTabsPage tab="purchased" />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
