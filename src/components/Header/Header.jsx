// src/components/layout/header/Header.jsx
import { lazy, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import useHeader from '../../hooks/useHeader.js';
import NavMain from './NavMain';
import HeaderIcons from './HeaderIcons';
import styles from './header.module.css';

const SearchBar = lazy(() => import('./SearchBar'));
const MobileDrawer = lazy(() => import('./MobileDrawer'));
const NavAdmin = lazy(() => import('./NavAdmin'));

const Header = ({ variant = 'main' }) => {
  const {
    inputValue,
    setInputValue,
    menuOpen,
    setMenuOpen,
    searchOpen,
    setSearchOpen,
    reservedCount,
    purchasedCount,
    handleHeartClick,
    handleBasketClick,
    handleCheckout,
    handleUserClick,
    handleNavClick,
    closeMenu,
  } = useHeader();

  return (
    <header className={`${styles.header} ${variant === 'admin' ? styles.admin : ''}`}>
      <Suspense fallback={null}>
        <div className="page-container">
          {/* ── Left: logo + search ── */}
          <div className={`${styles.left} ${variant === 'admin' ? styles.adminLeft : ''}`}>
            <NavLink to="/" className={styles.logo} onClick={() => handleNavClick('/')}>
              <svg width={40} height={40} aria-hidden="true">
                <use
                  href={
                    variant === 'main' ? '/sprite.svg#icon-logo' : '/sprite.svg#icon-logo-admin'
                  }
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
            </NavLink>

            {variant === 'main' && (
              <SearchBar
                value={inputValue}
                onChange={setInputValue}
                searchOpen={searchOpen}
                onToggle={() => setSearchOpen((v) => !v)}
                onClose={() => setSearchOpen(false)}
              />
            )}
          </div>

          {/* ── Centre: nav ── */}
          {variant === 'main' ? (
            <NavMain onNavClick={handleNavClick} />
          ) : (
            <NavAdmin onNavClick={handleNavClick} onCheckout={handleCheckout} />
          )}

          {/* ── Right: icon bar ── */}
          <HeaderIcons
            variant={variant}
            reservedCount={reservedCount}
            purchasedCount={purchasedCount}
            menuOpen={menuOpen}
            onHeartClick={handleHeartClick}
            onBasketClick={handleBasketClick}
            onUserClick={handleUserClick}
            onCheckout={handleCheckout}
            onMenuToggle={() => setMenuOpen((v) => !v)}
          />
        </div>

        {/* ── Mobile drawer + backdrop ── */}
        <MobileDrawer
          variant={variant}
          menuOpen={menuOpen}
          onNavClick={handleNavClick}
          onCheckout={handleCheckout}
          onClose={closeMenu}
        />
      </Suspense>
    </header>
  );
};

export default Header;
