// src/App.jsx
import { useAppSelector } from './app/hooks.js';
import RoutesConfig from './router/routes';
import LoginModal from './components/common/Modal/LoginModal';
import ToastContainer from './components/common/ToastContainer';

function App() {
  const isLoginOpen = useAppSelector((s) => s.ui.isLoginOpen);

  return (
    <>
      <RoutesConfig />
      {isLoginOpen && <LoginModal />}
      <ToastContainer />
    </>
  );
}

export default App;
