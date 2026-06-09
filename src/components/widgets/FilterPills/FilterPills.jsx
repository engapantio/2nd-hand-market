// src/components/common/FilterPills.jsx
import styles from './filterPills.module.css';

const FilterPills = ({ pills, onRemove }) => {
  if (!pills.length) return null;
  return (
    <ul className={styles.row}>
      {pills.map((pill) => (
        <li key={pill.key} className={styles.pill}>
          {pill.label}
          <svg
            aria-label={`Remove ${pill.label} filter`}
            width={20}
            height={20}
            onClick={() => onRemove(pill.key)}
          >
            <use href="sprite.svg#icon-dismiss" />
          </svg>
        </li>
      ))}
    </ul>
  );
};

export default FilterPills;
