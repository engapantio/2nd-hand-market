import { useState } from 'react';
import { SIDEBAR_CATEGORIES } from '../../../constants/categoryMap.js';
import styles from './sidebar.module.css';

const Sidebar = ({ onCategorySelect }) => {
  const [open, setOpen] = useState({});
  const toggle = (label) => setOpen((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className={styles.sidebar}>
      <ul>
        <h2 className={styles.title}>Categories</h2>
        {SIDEBAR_CATEGORIES.map((category) => {
          const isOpen = open[category.label] ?? false;

          return (
            <li key={category.label} className={styles.categoryName}>
              <button
                type="button"
                className={`${styles.categoryBtn} ${open[category.name] ? styles.open : ''}`}
                onClick={() => {
                  if (!isOpen) {
                    onCategorySelect({
                      categorySlug: category.slug,
                      categoryLabel: category.label,
                      subcategoryLabel: '',
                    });
                  }
                  toggle(category.label);
                }}
              >
                {category.label}
                <svg width={20} height={20}>
                  <use href={`sprite.svg#icon-chevron-${isOpen ? 'up' : 'down'}`}></use>
                </svg>
              </button>
              {isOpen && category.sub && (
                <div className={styles.subcategories}>
                  {category.sub.map((sub) => (
                    <button
                      key={sub.slug}
                      type="button"
                      className={styles.subBtn}
                      onClick={() =>
                        onCategorySelect({
                          categorySlug: sub.slug,
                          categoryLabel: category.label,
                          subcategoryLabel: sub.label,
                        })
                      }
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
