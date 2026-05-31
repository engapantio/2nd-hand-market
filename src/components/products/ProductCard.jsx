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
  const createdAt = product.meta?.createdAt || product.meta?.addedAt || product.createdAt;
  if (!createdAt) return false;
  const added = new Date(createdAt);
  const now = new Date();
  const diffMonths =
    (now.getFullYear() - added.getFullYear()) * 12 + (now.getMonth() - added.getMonth());
  return diffMonths <= 13;
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
        <svg width={20} height={20} className={styles.heart} onClick={handleHeartClick}>
          <use href={isReserved ? 'sprite.svg#icon-heart' : 'sprite.svg#icon-heart-grey'} />
        </svg>
        <div className={styles.pills}>
          {isNew(product) && <span className={styles.pillNew}>New</span>}
          {isReserved && <span className={styles.pillReserved}>Reserved</span>}
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.bottomRow}>
          <span className={styles.price}>{product.price.toFixed(2)} €</span>
          {!isPurchased ? (
            <svg width={32} height={32} className={styles.basket} onClick={handleBasketClick}>
              <use href="/sprite.svg#icon-cart-grey" />
            </svg>
          ) : (
            <span className={styles.added}>Added</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
