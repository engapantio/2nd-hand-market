import React from 'react';
import styles from '../../styles/tabs.module.css';

const TabsNav = ({ active, onChange, labels = {} }) => (
  <nav className={styles.tabsNav}>
    {Object.entries(labels).map(([key, label]) => (
      <button
        key={key}
        type="button"
        className={`${styles.tab} ${active === key ? styles.active : ''}`}
        onClick={() => onChange(key)}
      >
        {label}
      </button>
    ))}
  </nav>
);

export default TabsNav;
