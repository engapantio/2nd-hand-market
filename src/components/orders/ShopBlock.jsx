// src/components/orders/ShopBlock.jsx
import OrderProductCard from './OrderProductCard.jsx';
import styles from '../../styles/reservedList.module.css';

const formatDateRange = ({ start, end }) => {
  if (!start || !end) return '—';

  return `${formatDate(start)} - ${formatDate(end)}`;
};

const formatDate = (iso) => {
  if (!iso) return '—';

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';

  const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const weekday = WEEKDAYS[d.getUTCDay()];

  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();

  return `${weekday} ${dd}.${mm}.${yyyy}`;
};

const ShopBlock = ({ group, variant }) => {
  const { shopName, shopLocation, workHours, reservedRange, purchaseDate, products, shopMeta } =
    group;

  const reservedLabel =
    variant === 'reserved' && reservedRange ? formatDateRange(reservedRange) : '—';

  const purchasedLabel = variant === 'purchased' && purchaseDate ? formatDate(purchaseDate) : '—';

  return (
    <section className={styles.shopBlock}>
      <header className={styles.shopHeader}>
        <div className={styles.shopCol}>
          <span className={styles.shopLabel}>Shop</span>
          <span className={styles.shopName}>{shopName}</span>
        </div>
        <div className={styles.shopCol}>
          <span className={styles.shopLabel}>Location</span>
          <span className={styles.shopValue}>{shopLocation}</span>
        </div>
        <div className={styles.shopCol}>
          <span className={styles.shopLabel}>Work hours</span>
          <span className={styles.shopValue}>{workHours}</span>
        </div>
        <div className={styles.shopCol}>
          <span className={styles.shopLabel}>
            {variant === 'reserved' ? 'Reserved time' : 'Purchased time'}
          </span>
          <span className={styles.shopValue}>
            {variant === 'reserved' ? reservedLabel : purchasedLabel}
          </span>
        </div>
      </header>

      <ul className={styles.cardGrid}>
        {products.map((item) => (
          <OrderProductCard key={item.id} item={item} shopMeta={shopMeta} />
        ))}
      </ul>
    </section>
  );
};

export default ShopBlock;
