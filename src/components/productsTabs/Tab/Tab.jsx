// src/components/products/ReservedList.jsx
import ShopBlock from '../ShopBlock/ShopBlock.jsx';
import { groupByShop } from '../../../utils/shopUtils.js';
import styles from './tab.module.css';

const Tab = ({ items = [], variant }) => {
  if (!items.length) {
    return <p className={styles.empty}>No reserved products yet.</p>;
  }

  const groups = groupByShop(items);

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <ShopBlock key={group.shopKey} group={group} variant={variant} />
      ))}
    </div>
  );
};

export default Tab;
