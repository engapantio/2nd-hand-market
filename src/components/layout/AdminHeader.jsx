// src/components/layout/AdminHeader.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { useLogoutUserMutation } from '../../api/dummyApi.js';
import { logout, selectCurrentUser } from '../../features/auth/authSlice.js';
import styles from '../../styles/header.module.css';

const AdminHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const [logoutUser] = useLogoutUserMutation();

  const handleCheckout = async () => {
    if (user) {
      try {
        await logoutUser(user.id).unwrap(); // simulated API call
      } catch (e) {
        // optional: show toast but still clear local auth
      }
    }
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <header className={`${styles.header} ${styles.admin}`}>
      <div className="page-container">
        {/* logo + admin nav items here */}
        <nav className={styles.nav}>
          <NavLink to="/maintenance" className={styles.navLink}>
            Maintain Items
          </NavLink>
          <NavLink to="/user-management" className={styles.navLink}>
            User Management
          </NavLink>

          <button type="button" className={styles.navLink} onClick={handleCheckout}>
            Checkout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
