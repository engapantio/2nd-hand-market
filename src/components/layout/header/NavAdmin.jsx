// src/components/layout/header/NavAdmin.jsx
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/header.module.css';

const NavAdmin = ({ onNavClick, onCheckout }) => (
  <nav className={`${styles.adminNavigation} ${styles.desktopNav}`}>
    <NavLink
      to="/maintenance"
      className={styles.navLink}
      onClick={() => onNavClick('/maintenance')}
    >
      Maintain Items
    </NavLink>
    <NavLink
      to="/maintenance"
      className={styles.navLink}
      onClick={() => onNavClick('/maintenance')}
    >
      Master Data
    </NavLink>
    <NavLink
      to="/user-management"
      className={styles.navLink}
      onClick={() => onNavClick('/user-management')}
    >
      User Management
    </NavLink>
    <NavLink
      to="/maintenance"
      className={styles.navLink}
      onClick={() => onNavClick('/maintenance')}
    >
      Reporting
    </NavLink>
    <NavLink
      to="/maintenance"
      className={styles.navLink}
      onClick={() => onNavClick('/maintenance')}
    >
      Settlement BC
    </NavLink>
    <button type="button" className={styles.navLink} onClick={onCheckout}>
      Checkout
    </button>
  </nav>
);

export default NavAdmin;
