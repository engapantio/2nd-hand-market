// src/components/layout/header/HeaderIcons.jsx
import styles from '../../../styles/header.module.css';

const HeaderIcons = ({
  variant,
  reservedCount,
  purchasedCount,
  menuOpen,
  onHeartClick,
  onBasketClick,
  onUserClick,
  onMenuToggle,
  onCheckout,
}) => (
  <ul className={styles.icons}>
    {variant === 'main' && (
      <>
        <li className={styles.iconGroup}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={`Reserved items: ${reservedCount}`}
            onClick={onHeartClick}
          >
            <svg width={20} height={20} aria-hidden="true">
              <use
                href={
                  reservedCount === 0 ? '/sprite.svg#icon-heart' : '/sprite.svg#icon-heart-white'
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
            onClick={onBasketClick}
          >
            <svg width={20} height={20} aria-hidden="true">
              <use
                href={
                  purchasedCount === 0 ? '/sprite.svg#icon-cart' : '/sprite.svg#icon-cart-white'
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
        <button type="button" className={styles.navLink} onClick={onCheckout}>
          Checkout
        </button>
      </li>
    )}

    <li className={styles.iconGroup}>
      <button type="button" className={styles.iconBtn} aria-label="User menu" onClick={onUserClick}>
        <svg width={20} height={20} aria-hidden="true">
          <use href="/sprite.svg#icon-user" />
        </svg>
        <svg width={8} height={5} fill="white">
          <use href="sprite.svg#icon-chevron-down" />
        </svg>
      </button>
    </li>

    <li className={styles.hamburgerWrap}>
      <button
        type="button"
        className={styles.hamburger}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={onMenuToggle}
      >
        <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
      </button>
    </li>
  </ul>
);

export default HeaderIcons;
