// src/App.jsx
import { useAppSelector } from './app/hooks';
import RoutesConfig from './routes';
import LoginModal from './components/layout/LoginModal';
import ToastContainer from './components/common/ToastContainer.jsx';

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
