import React, { useState } from 'react';
import styles from '../../styles/sidebar.module.css';

const categories = [
  { name: 'Shoes', subs: ['Sneakers', 'Boots', 'Heels', 'Sandals'] },
  { name: 'Apparel', subs: ['Jackets', 'Shirts', 'Pants', 'Dresses'] },
  { name: 'Accessories', subs: ['Bags', 'Belts', 'Hats', 'Scarves'] },
  { name: 'Sport', subs: ['Running', 'Training', 'Outdoor'] },
  { name: 'Beauty', subs: ['Skincare', 'Makeup', 'Fragrance'] },
];

const Sidebar = ({ onCategorySelect }) => {
  const [open, setOpen] = useState({});
  const toggle = (name) => setOpen((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <aside className={styles.sidebar}>
      {categories.map((cat) => (
        <div key={cat.name}>
          <button
            type="button"
            className={`${styles.categoryBtn} ${open[cat.name] ? styles.open : ''}`}
            onClick={() => toggle(cat.name)}
          >
            {cat.name}
            <span className={styles.arrow}>{open[cat.name] ? '▲' : '▼'}</span>
          </button>
          {open[cat.name] && (
            <div className={styles.subcategories}>
              {cat.subs.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  className={styles.subBtn}
                  onClick={() => onCategorySelect && onCategorySelect(cat.name, sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
