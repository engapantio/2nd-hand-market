// src/routes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/HomePage';
import ProductsTabsPage from './pages/ProductsTabsPage';
import MaintenancePage from './pages/MaintenancePage';
import UserManagementPage from './pages/UserManagementPage';
import { useAppSelector } from './app/hooks';

const ProtectedRoute = ({ children }) => {
  const isAuth = useAppSelector((s) => !!s.auth.user);
  if (!isAuth) return <Navigate to="/" replace />;
  return children;
};

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
