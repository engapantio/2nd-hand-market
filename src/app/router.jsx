import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import ProtectedRoute from '../features/auth/protectedRoute.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import ProductsPage from '../features/products/pages/ProductsPage.jsx';
import ProductDetailsPage from '../features/products/pages/ProductDetailsPage.jsx';
import AdminProductsPage from '../features/products/pages/AdminProductPage.jsx';
import NewProductPage from '../features/products/pages/NewProductPage.jsx';
import AdminNewUserPage from '../features/users/pages/AdminNewUserPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: 'products',
            element: <ProductsPage />,
          },
          {
            path: 'products/:productId',
            element: <ProductDetailsPage />,
          },
        ],
      },
      {
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'admin/products',
            element: <AdminProductsPage />,
          },
          {
            path: 'admin/products/new',
            element: <NewProductPage />,
          },
          {
            path: 'admin/users/new',
            element: <AdminNewUserPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
