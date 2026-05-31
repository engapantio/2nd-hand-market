// src/components/products/ReservedList.jsx
import ShopBlock from '../orders/ShopBlock.jsx';
import { groupByShop } from '../orders/shopUtils.js';
import styles from '../../styles/reservedList.module.css';

const ReservedList = ({ items = [] }) => {
  if (!items.length) {
    return <p className={styles.empty}>No reserved products yet.</p>;
  }

  const groups = groupByShop(items);

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <ShopBlock key={group.shopKey} group={group} variant="reserved" />
      ))}
    </div>
  );
};

export default ReservedList;
