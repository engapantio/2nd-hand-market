import styles from '../../styles/tabs.module.css';

const TabsNav = ({ active, onChange, labels = {} }) => (
  <ul className={styles.tabsNav}>
    {Object.entries(labels).map(([key, label]) => (
      <li
        key={key}
        className={`${styles.tab} ${active === key ? styles.active : ''}`}
        onClick={() => onChange(key)}
      >
        {label}
      </li>
    ))}
  </ul>
);

export default TabsNav;
