import styles from '../../styles/breadcrumbs.module.css';

const Breadcrumbs = ({ items = [] }) => {
  const isSingle = items.length === 1;

  return (
    <nav aria-label="Breadcrumbs">
      <ul className={styles.breadcrumbs}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const itemClass = !isSingle && isLast ? `${styles.item} ${styles.current}` : styles.item;

          return (
            <li key={`${item}-${i}`} className={itemClass}>
              {i > 0 && (
                <svg width={12} height={12} className={styles.icon}>
                  <use href="/sprite.svg#icon-breadcrumb" />
                </svg>
              )}
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
