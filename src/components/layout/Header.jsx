// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openLogin, setActiveProductsTab, setSearchQuery } from '../../features/ui/uiSlice';
import { selectReservedCount, selectPurchasedCount } from '../../features/products/productsSlice';
import { useLogoutUserMutation } from '../../api/dummyApi.js';
import { logout, selectCurrentUser } from '../../features/auth/authSlice.js';
import useDebounce from '../../hooks/useDebounce';
import styles from '../../styles/header.module.css';

const Header = ({ variant = 'main' }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const reservedCount = useAppSelector(selectReservedCount);
  const purchasedCount = useAppSelector(selectPurchasedCount);
  const user = useAppSelector(selectCurrentUser);
  const isLoggedIn = useAppSelector((s) => !!s.auth.user);
  const [logoutUser] = useLogoutUserMutation();
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useDebounce(inputValue, 500);

  const handleHeartClick = () => {
    dispatch(setActiveProductsTab('reserved'));
    navigate('/reserved');
  };

  const handleBasketClick = () => {
    dispatch(setActiveProductsTab('purchased'));
    navigate('/purchased');
  };

  const handleCheckout = async () => {
    if (user) {
      try {
        await logoutUser(user.id).unwrap(); // simulated API call
      } catch (_e) {
        // optional: show toast but still clear local auth
      }
    }
    dispatch(logout());
    navigate('/', { replace: true });
  };

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/maintenance');
    } else {
      dispatch(openLogin());
    }
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
              <div
                className={`${styles.logoText} ${variant === 'admin' ? styles.logoTextBack : ''}`}
              >
                2ND HAND MARKET
              </div>
              {variant === 'admin' && <div className={styles.logoSub}>BACKOFFICE</div>}
            </div>
          </a>
          {variant === 'main' && (
            <fieldset className={styles.search}>
              <input
                type="text"
                placeholder="Search products"
                className={styles.searchInput}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <svg width={16} height={16} aria-hidden="true" className={styles.searchIcon}>
                <use href="/sprite.svg#icon-glass" />
              </svg>
            </fieldset>
          )}
        </div>
        {variant === 'main' ? (
          <nav className={styles.navigation}>
            <NavLink className={styles.navLink} onClick={() => navigate('/')}>
              About us
            </NavLink>
            <NavLink className={styles.navLink} onClick={() => navigate('/')}>
              All shops
            </NavLink>
            <NavLink className={styles.navLink} onClick={() => navigate('/')}>
              Become a merchant
            </NavLink>
          </nav>
        ) : (
          <nav className={styles.adminNavigation}>
            <a className={styles.navLink} onClick={() => navigate('/maintenance')}>
              Maintain Items
            </a>
            <NavLink className={styles.navLink} onClick={() => navigate('/maintenance')}>
              Master Data
            </NavLink>
            <a className={styles.navLink} onClick={() => navigate('/user-management')}>
              User Management
            </a>
            <NavLink className={styles.navLink} onClick={() => navigate('/maintenance')}>
              Reporting
            </NavLink>
            <NavLink className={styles.navLink} onClick={() => navigate('/maintenance')}>
              Settlement BC
            </NavLink>
          </nav>
        )}

        <ul className={styles.icons}>
          {variant === 'main' && (
            <>
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
                      reservedCount === 0
                        ? '/sprite.svg#icon-heart'
                        : '/sprite.svg#icon-heart-white'
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
            </>
          )}
          {variant === 'admin' && (
            <li>
              <button type="button" className={styles.navLink} onClick={handleCheckout}>
                Checkout
              </button>
            </li>
          )}
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
