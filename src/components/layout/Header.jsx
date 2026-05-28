// src/components/layout/Header.jsx
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openLogin, setActiveProductsTab } from '../../features/ui/uiSlice';
import { selectReservedCount, selectPurchasedCount } from '../../features/products/productsSlice';
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
        <div className={`${styles.right} ${variant === 'admin' ? styles.left : ''}`}>
          <a className={styles.logo} onClick={() => navigate('/')}>
            <svg width={40} height={40} aria-hidden="true">
              <use
                href={variant === 'main' ? '/sprite.svg#icon-logo' : '/sprite.svg#icon-logo-admin'}
              />
            </svg>
            <div>
              <div className={styles.logoText}>2ND HAND MARKET</div>
              {variant === 'admin' && <div className={styles.logoSub}>BACKOFFICE</div>}
            </div>
          </a>
          {variant === 'main' && (
            <fieldset className={styles.search}>
              <input type="text" placeholder="Search products" className={styles.searchInput} />
              <svg width={16} height={16} aria-hidden="true" className={styles.searchIcon}>
                <use href="/sprite.svg#icon-glass" />
              </svg>
            </fieldset>
          )}
        </div>
        <nav
          className={`${styles.navigation} ${variant === 'admin' ? styles.adminNavigation : ''}`}
        >
          <button type="button" className={styles.navLink} onClick={() => navigate('/')}>
            About us
          </button>
          <button type="button" className={styles.navLink} onClick={() => navigate('/')}>
            All shops
          </button>
          <button type="button" className={styles.navLink} onClick={() => navigate('/')}>
            Become a merchant
          </button>
        </nav>
        <ul className={styles.icons}>
          <li className={styles.iconGroup}>
            <svg
              width={20}
              height={20}
              aria-hidden="true"
              className={styles.iconButton}
              onClick={handleHeartClick}
            >
              <use
                href={
                  reservedCount === 0 ? '/sprite.svg#icon-heart' : '/sprite.svg#icon-heart-white'
                }
              />
            </svg>
            <span>{reservedCount}</span>
          </li>

          <li className={styles.iconGroup}>
            <svg
              width={20}
              height={20}
              aria-hidden="true"
              className={styles.iconButton}
              onClick={handleBasketClick}
            >
              <use
                href={
                  purchasedCount === 0 ? '/sprite.svg#icon-cart' : '/sprite.svg#icon-cart-white'
                }
              />
            </svg>
            <span>{purchasedCount}</span>
          </li>

          <li className={styles.iconGroup}>
            <svg
              width={20}
              height={20}
              aria-hidden="true"
              className={styles.iconButton}
              onClick={handleUserClick}
            >
              <use href="/sprite.svg#icon-user" />
            </svg>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
