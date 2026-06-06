// src/components/layout/header/SearchBar.jsx
import styles from '../../../styles/header.module.css';

const SearchBar = ({ value, onChange, searchOpen, onToggle, onClose }) => (
  <>
    {/* Desktop inline search */}
    <fieldset className={`${styles.search} ${styles.searchDesktop}`}>
      <input
        type="text"
        placeholder="Search"
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <svg width={16} height={16} aria-hidden="true" className={styles.searchIcon}>
        <use href="/sprite.svg#icon-glass" />
      </svg>
    </fieldset>

    {/* Mobile toggle button */}
    <button
      type="button"
      className={`${styles.iconBtn} ${styles.searchToggle}`}
      aria-label="Toggle search"
      onClick={onToggle}
    >
      <svg width={20} height={20} aria-hidden="true">
        <use href="/sprite.svg#icon-glass" />
      </svg>
    </button>

    {/* Mobile overlay */}
    {searchOpen && (
      <div className={styles.searchOverlay}>
        <fieldset className={styles.search}>
          <input
            type="text"
            placeholder="Search products…"
            className={styles.searchInput}
            value={value}
            autoFocus
            onChange={(e) => onChange(e.target.value)}
          />
          <svg width={16} height={16} aria-hidden="true" className={styles.searchIcon}>
            <use href="/sprite.svg#icon-glass" />
          </svg>
        </fieldset>
        <button
          type="button"
          className={styles.searchClose}
          aria-label="Close search"
          onClick={onClose}
        >
          <svg width={16} height={16}>
            <use href="sprite.svg#icon-dismiss" />
          </svg>
        </button>
      </div>
    )}
  </>
);

export default SearchBar;
