import { Link } from 'react-router-dom';
import styles from './breadcrumbs.module.css';

const Breadcrumbs = ({ items = [] }) => {
  const isSingle = items.length === 1;

  return (
    <nav aria-label="Breadcrumbs">
      <ul className={styles.breadcrumbs}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const label = typeof item === 'string' ? item : item.label;
          const to = typeof item === 'string' ? '' : item.to;
          const itemClass = isSingle ? styles.base : isLast ? styles.current : styles.base;
          const listItemClass =
            typeof item !== 'string' ? `${styles.item} ${styles.backoffice}` : itemClass;

          return (
            <li key={`${label}-${i}`} className={listItemClass}>
              {i > 0 && (
                <svg
                  width={typeof item === 'string' ? 12 : 20}
                  height={typeof item === 'string' ? 12 : 20}
                  className={styles.icon}
                >
                  <use href="/sprite.svg#icon-breadcrumb" />
                </svg>
              )}
              {to && !isLast ? (
                <Link to={to} className={`${styles.link}`}>
                  {label}
                </Link>
              ) : (
                <span>{label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
