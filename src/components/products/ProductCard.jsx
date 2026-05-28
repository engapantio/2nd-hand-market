// src/components/products/ProductCard.jsx
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  toggleReserved,
  addPurchased,
  selectReserved,
  selectPurchased,
} from '../../features/products/productsSlice';
import styles from '../../styles/productCard.module.css';

const isNew = (product) => {
  if (!product.meta?.addedAt) return false;
  const added = new Date(product.meta.addedAt);
  const now = new Date();
  const diffMonths =
    (now.getFullYear() - added.getFullYear()) * 12 + (now.getMonth() - added.getMonth());
  return diffMonths < 2;
};

const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();
  const reserved = useAppSelector(selectReserved);
  const purchased = useAppSelector(selectPurchased);

  const isReserved = reserved.some((r) => r.product.id === product.id);
  const isPurchased = purchased.some((p) => p.product.id === product.id);

  const handleHeartClick = () => {
    dispatch(toggleReserved(product));
  };

  const handleBasketClick = () => {
    if (!isPurchased) {
      dispatch(addPurchased(product));
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.thumbnail} alt={product.title} />
        <button
          type="button"
          className={`${styles.heart} ${isReserved ? styles.heartActive : ''}`}
          onClick={handleHeartClick}
        />
        <div className={styles.pills}>
          {isNew(product) && <span className={styles.pillNew}>New</span>}
          {isReserved && <span className={styles.pillReserved}>Reserved</span>}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.bottomRow}>
          <span className={styles.price}>{product.price.toFixed(2)} €</span>
          {!isPurchased ? (
            <button type="button" className={styles.basket} onClick={handleBasketClick} />
          ) : (
            <span className={styles.added}>Added</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
