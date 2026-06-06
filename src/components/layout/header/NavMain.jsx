// src/components/layout/header/NavMain.jsx
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/header.module.css';

const NavMain = ({ onNavClick }) => (
  <nav className={`${styles.navigation} ${styles.desktopNav}`}>
    <NavLink to="/" className={styles.navLink} onClick={() => onNavClick('/')}>
      About us
    </NavLink>
    <NavLink to="/" className={styles.navLink} onClick={() => onNavClick('/')}>
      All shops
    </NavLink>
    <NavLink to="/" className={styles.navLink} onClick={() => onNavClick('/')}>
      Become a merchant
    </NavLink>
  </nav>
);

export default NavMain;
