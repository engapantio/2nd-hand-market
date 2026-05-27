import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProviders from './app/providers.jsx';
import router from './app/router.jsx';


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element  #root not found');
}

createRoot(rootElement).render(
  <AppProviders>
    <RouterProvider router={router} />
  </AppProviders>
);
