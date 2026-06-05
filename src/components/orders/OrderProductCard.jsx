// src/components/orders/OrderProductCard.jsx
import styles from '../../styles/reservedList.module.css';

const OrderProductCard = ({ item, shopMeta }) => (
  <li className={styles.card}>
    <div className={styles.cardMedia}>
      <img src={item.thumbnail} alt={item.title} className={styles.cardImage} />
    </div>

    <div className={styles.cardBody}>
      <h3 className={styles.cardTitle}>{item.title}</h3>

      {/* Price */}
      <p className={styles.cardRow}>
        <span className={styles.datapoint}>Price: </span>
        {item.price?.toFixed ? item.price.toFixed(2) : item.price} €
      </p>

      {/* Color / Size */}
      <p className={styles.cardRow}>
        <span className={styles.datapoint}>Color: </span>
        {item.color || '—'}
        <span className={styles.datapoint}>Size: </span>
        {item.size || '—'}
      </p>
      {/* )} */}

      {/* Delivery time from shop meta */}
      <p className={styles.cardRow}>
        <span className={styles.datapoint}>Delivery time: </span>
        {shopMeta.deliveryTime}
      </p>

      {/* Shipping to country */}
      <p className={styles.cardRow}>
        <span className={styles.shippingLabel}>
          Shipping to Germany
          <svg className={styles.chevron} width="8" height="5">
            <use href="sprite.svg#icon-polygon" />
          </svg>
        </span>
      </p>

      {/* Free shipping threshold */}
      <p className={styles.datapoint}>Free shipping from {shopMeta.freeShippingFrom}</p>
    </div>
  </li>
);

export default OrderProductCard;
