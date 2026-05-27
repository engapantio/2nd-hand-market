// src/components/layout/Header.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openLogin, setActiveProductsTab } from '../../features/ui/uiSlice';
import { selectReservedCount, selectPurchasedCount } from '../../features/cart/cartSlice';
import styles from '../../styles/header.module.css';

const Header = ({ variant = 'main' }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const reservedCount = useAppSelector(selectReservedCount);
  const purchasedCount = useAppSelector(selectPurchasedCount);

  const handleHeartClick = () => {
    dispatch(setActiveProductsTab('reserved'));
    navigate('/reserved');
  };

  const handleBasketClick = () => {
    dispatch(setActiveProductsTab('purchased'));
    navigate('/purchased');
  };

  const handleUserClick = () => {
    dispatch(openLogin());
  };

  return (
    <header className={`${styles.header} ${variant === 'admin' ? styles.admin : ''}`}>
      <div className="page-container">
        <div className={styles.left}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>Y</span>
            <div>
              <div className={styles.logoText}>2ND HAND MARKET</div>
              {variant === 'admin' && <div className={styles.logoSub}>BACKOFFICE</div>}
            </div>
          </div>
          <div className={styles.search}>
            <input type="text" placeholder="Search products" className={styles.searchInput} />
          </div>
        </div>
        <nav className={styles.nav}>
          <button type="button" className={styles.navLink} onClick={() => navigate('/')}>
            About us
          </button>
          <button type="button" className={styles.navLink} onClick={() => navigate('/')}>
            All shops
          </button>
          <button type="button" className={styles.navLink} onClick={() => navigate('/')}>
            Become a merchant
          </button>

          <button type="button" className={styles.iconButton} onClick={handleHeartClick}>
            <span className={styles.iconHeart} />
            <span>{reservedCount}</span>
          </button>

          <button type="button" className={styles.iconButton} onClick={handleBasketClick}>
            <span className={styles.iconCart} />
            <span>{purchasedCount}</span>
          </button>

          <button type="button" className={styles.iconButton} onClick={handleUserClick}>
            <span className={styles.iconUser} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
