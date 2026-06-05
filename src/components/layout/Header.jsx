// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openLogin, setActiveProductsTab, setSearchQuery } from '../../features/ui/uiSlice';
import { selectReservedCount, selectPurchasedCount } from '../../features/products/productsSlice';
import { useLogoutUserMutation } from '../../api/dummyApi.js';
import { logout, selectCurrentUser } from '../../features/auth/authSlice.js';
import { clearRows } from '../../features/maintenance/maintenanceSlice.js';
import useDebounce from '../../hooks/useDebounce';
import styles from '../../styles/header.module.css';
import toast from 'react-hot-toast';

const Header = ({ variant = 'main' }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const reservedCount = useAppSelector(selectReservedCount);
  const purchasedCount = useAppSelector(selectPurchasedCount);
  const user = useAppSelector(selectCurrentUser);
  const isLoggedIn = useAppSelector((s) => !!s.auth.user);
  const [logoutUser] = useLogoutUserMutation();
  const [inputValue, setInputValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const debouncedSearch = useDebounce(inputValue, 500);

  const handleHeartClick = () => {
    dispatch(setActiveProductsTab('reserved'));
    navigate('/reserved');
    setMenuOpen(false);
  };

  const handleBasketClick = () => {
    dispatch(setActiveProductsTab('purchased'));
    navigate('/purchased');
    setMenuOpen(false);
  };

  const handleCheckout = async () => {
    if (user) {
      try {
        await logoutUser(user.id).unwrap();
        toast('Admin logged out successfully');
      } catch (e) {
        toast(`There was an issue: ${e} but the logout is successfull`);
      }
    }
    dispatch(clearRows());
    dispatch(logout());
    navigate('/', { replace: true });
    setMenuOpen(false);
  };

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/maintenance');
    } else {
      dispatch(openLogin());
    }
    setMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${variant === 'admin' ? styles.admin : ''}`}>
      <div className="page-container">
        <div className={`${styles.left} ${variant === 'admin' ? styles.adminLeft : ''}`}>
          <a className={styles.logo} onClick={() => handleNavClick('/')}>
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
            <>
              <fieldset className={`${styles.search} ${styles.searchDesktop}`}>
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.searchInput}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <svg width={16} height={16} aria-hidden="true" className={styles.searchIcon}>
                  <use href="/sprite.svg#icon-glass" />
                </svg>
              </fieldset>

              {/* Mobile search toggle */}
              <button
                type="button"
                className={`${styles.iconBtn} ${styles.searchToggle}`}
                aria-label="Toggle search"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <svg width={20} height={20} aria-hidden="true">
                  <use href="/sprite.svg#icon-glass" />
                </svg>
              </button>
            </>
          )}
        </div>
        {variant === 'main' ? (
          <nav className={`${styles.navigation} ${styles.desktopNav}`}>
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
          <nav className={`${styles.adminNavigation} ${styles.desktopNav}`}>
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
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label={`Reserved items: ${reservedCount}`}
                  onClick={handleHeartClick}
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use
                      href={
                        reservedCount === 0
                          ? '/sprite.svg#icon-heart'
                          : '/sprite.svg#icon-heart-white'
                      }
                    />
                  </svg>
                </button>
                <span>{reservedCount}</span>
              </li>

              <li className={styles.iconGroup}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label={`Purchased items: ${purchasedCount}`}
                  onClick={handleBasketClick}
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use
                      href={
                        purchasedCount === 0
                          ? '/sprite.svg#icon-cart'
                          : '/sprite.svg#icon-cart-white'
                      }
                    />
                  </svg>
                </button>
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
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="User menu"
              onClick={handleUserClick}
            >
              <svg
                width={20}
                height={20}
                aria-hidden="true"
                className={styles.iconButton}
                onClick={handleUserClick}
              >
                <use href="/sprite.svg#icon-user" />
              </svg>
              <svg width={8} height={5} fill={'white'}>
                <use href="sprite.svg#icon-chevron-down"></use>
              </svg>
            </button>
          </li>
          {/* Hamburger — mobile only */}
          <li className={styles.hamburgerWrap}>
            <button
              type="button"
              className={styles.hamburger}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
            </button>
          </li>
        </ul>
      </div>
      {variant === 'main' && searchOpen && (
        <div className={styles.searchOverlay}>
          <fieldset className={styles.search}>
            <input
              type="text"
              placeholder="Search products…"
              className={styles.searchInput}
              value={inputValue}
              autoFocus
              onChange={(e) => setInputValue(e.target.value)}
            />
            <svg width={16} height={16} aria-hidden="true" className={styles.searchIcon}>
              <use href="/sprite.svg#icon-glass" />
            </svg>
          </fieldset>
          <button
            type="button"
            className={styles.searchClose}
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <svg width={16} height={16}>
              <use href="sprite.svg#icon-dismiss"></use>
            </svg>
          </button>
        </div>
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        {variant === 'main' ? (
          <nav className={styles.drawerNav}>
            <a className={styles.drawerLink} onClick={() => handleNavClick('/')}>
              About us
            </a>
            <a className={styles.drawerLink} onClick={() => handleNavClick('/')}>
              All shops
            </a>
            <a className={styles.drawerLink} onClick={() => handleNavClick('/')}>
              Become a merchant
            </a>
          </nav>
        ) : (
          <nav className={styles.drawerNav}>
            <a className={styles.drawerLink} onClick={() => handleNavClick('/maintenance')}>
              Maintain Items
            </a>
            <a className={styles.drawerLink} onClick={() => handleNavClick('/maintenance')}>
              Master Data
            </a>
            <a className={styles.drawerLink} onClick={() => handleNavClick('/user-management')}>
              User Management
            </a>
            <a className={styles.drawerLink} onClick={() => handleNavClick('/maintenance')}>
              Reporting
            </a>
            <a className={styles.drawerLink} onClick={() => handleNavClick('/maintenance')}>
              Settlement BC
            </a>
            <button type="button" className={styles.drawerCheckout} onClick={handleCheckout}>
              Checkout
            </button>
          </nav>
        )}
      </div>

      {/* ── Backdrop ── */}
      {menuOpen && (
        <div className={styles.backdrop} aria-hidden="true" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;
