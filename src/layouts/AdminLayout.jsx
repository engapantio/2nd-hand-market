import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';

const AdminLayout = () => {
  return (
    <>
      <Header variant="admin" />
      <Outlet />
    </>
  );
};

export default AdminLayout;
