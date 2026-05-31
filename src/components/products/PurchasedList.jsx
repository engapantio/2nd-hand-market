// src/components/products/PurchasedList.jsx
import ShopBlock from '../orders/ShopBlock.jsx';
import { groupByShop } from '../orders/shopUtils.js';
import styles from '../../styles/reservedList.module.css';

const PurchasedList = ({ items = [] }) => {
  if (!items.length) {
    return <p className={styles.empty}>No purchased products yet.</p>;
  }

  const groups = groupByShop(items);

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <ShopBlock key={group.shopKey} group={group} variant="purchased" />
      ))}
    </div>
  );
};

export default PurchasedList;
