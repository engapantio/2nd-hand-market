// src/components/products/ReservedList.jsx
import styles from '../../styles/reservedList.module.css';

const formatDateRange = ({ start, end }) => {
  const s = new Date(start);
  const e = new Date(end);
  const format = (d) =>
    d.toLocaleDateString(undefined, {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  return `${format(s)} - ${format(e)}`;
};

const ReservedList = ({ items }) => {
  if (!items.length) {
    return <p>No reserved products yet.</p>;
  }

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
              <div className={styles.label}>Reserved time</div>
              <div>{formatDateRange(entry.reservation)}</div>
            </div>
          </header>

          <div className={styles.productsRow}>
            {/* simplified: only 1 product per row; can map multiple */}
            <div className={styles.product}>
              <img
                src={entry.product.thumbnail}
                alt={entry.product.title}
                className={styles.image}
              />
              <div className={styles.info}>
                <h3>{entry.product.title}</h3>
                <div>Price: {entry.product.price.toFixed(2)} €</div>
                {/* other meta like size/color as needed */}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ReservedList;
