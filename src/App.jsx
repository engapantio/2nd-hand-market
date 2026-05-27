// src/App.jsx
import React from 'react';
import { useAppSelector } from './app/hooks';
import RoutesConfig from './routes';
import LoginModal from './components/layout/LoginModal';

function App() {
  const isLoginOpen = useAppSelector((s) => s.ui.isLoginOpen);

  return (
    <>
      <RoutesConfig />
      {isLoginOpen && <LoginModal />}
    </>
  );
}

export default App;
