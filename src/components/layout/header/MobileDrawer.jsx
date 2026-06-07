// src/components/layout/header/MobileDrawer.jsx
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/header.module.css';

const MobileDrawer = ({ variant, menuOpen, onNavClick, onCheckout, onClose }) => (
  <>
    <div
      className={`${styles.drawer} ${menuOpen && styles.drawerOpen} ${variant !== 'main' ? styles.drawerAdmin : ''}`}
    >
      {variant === 'main' ? (
        <nav className={styles.drawerNav}>
          <NavLink to="/" className={styles.drawerLink} onClick={() => onNavClick('/')}>
            About us
          </NavLink>
          <NavLink to="/" className={styles.drawerLink} onClick={() => onNavClick('/')}>
            All shops
          </NavLink>
          <NavLink to="/" className={styles.drawerLink} onClick={() => onNavClick('/')}>
            Become a merchant
          </NavLink>
        </nav>
      ) : (
        <nav className={styles.drawerNav}>
          <NavLink
            to="/maintenance"
            className={styles.drawerLink}
            onClick={() => onNavClick('/maintenance')}
          >
            Maintain Items
          </NavLink>
          <NavLink
            to="/maintenance"
            className={styles.drawerLink}
            onClick={() => onNavClick('/maintenance')}
          >
            Master Data
          </NavLink>
          <NavLink
            to="/user-management"
            className={styles.drawerLink}
            onClick={() => onNavClick('/user-management')}
          >
            User Management
          </NavLink>
          <NavLink
            to="/maintenance"
            className={styles.drawerLink}
            onClick={() => onNavClick('/maintenance')}
          >
            Reporting
          </NavLink>
          <NavLink
            to="/maintenance"
            className={styles.drawerLink}
            onClick={() => onNavClick('/maintenance')}
          >
            Settlement BC
          </NavLink>
          <button type="button" className={styles.drawerCheckout} onClick={onCheckout}>
            Checkout
          </button>
        </nav>
      )}
    </div>

    {menuOpen && <div className={styles.backdrop} onClick={onClose} />}
  </>
);

export default MobileDrawer;
