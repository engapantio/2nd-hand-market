// src/routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
// import MainLayout from './components/layout/MainLayout';
// import AdminLayout from './components/layout/AdminLayout';
// import ProtectedRoute from './features/auth/protectedRoute.jsx';
import Loader from './components/common/Loader.jsx';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsTabsPage = lazy(() => import('./pages/ProductsTabsPage'));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage'));
const UserManagementPage = lazy(() => import('./pages/UserManagementPage'));
const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const ProtectedRoute = lazy(() => import('./features/auth/protectedRoute.jsx'));

export default function RoutesConfig() {
  return (
    <Suspense falback={Loader}>
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
    </Suspense>
  );
}
