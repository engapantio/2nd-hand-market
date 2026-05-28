import React from 'react';
import styles from '../../styles/reservedList.module.css';

const fmt = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

const PurchasedList = ({ items = [] }) => {
  if (!items.length)
    return (
      <p style={{ color: '#a1a1a1', padding: '40px 0', textAlign: 'center' }}>
        No purchased products yet.
      </p>
    );

  return (
    <div className={styles.list}>
      {items.map((entry) => (
        <section key={entry.id} className={styles.row}>
          <header className={styles.header}>
            <div>
              <div className={styles.label}>Shop</div>
              <div>{entry.shop.name}</div>
            </div>
            <div>
              <div className={styles.label}>Location</div>
              <div>{entry.shop.address}</div>
            </div>
            <div>
              <div className={styles.label}>Work hours</div>
              <div>{entry.shop.workHours}</div>
            </div>
            <div>
              <div className={styles.label}>Purchase time</div>
              <div>{fmt(entry.purchaseTime)}</div>
            </div>
          </header>
          <div className={styles.productsRow}>
            <div className={styles.product}>
              <img
                src={entry.product.thumbnail}
                alt={entry.product.title}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.info}>
                <h3>{entry.product.title}</h3>
                <div>Price: {entry.product.price.toFixed(2)} €</div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default PurchasedList;
