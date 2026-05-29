// src/components/common/FilterPills.jsx
import styles from '../../styles/filterPills.module.css';

const FilterPills = ({ pills, onRemove }) => {
  if (!pills.length) return null;
  return (
    <div className={styles.row}>
      {pills.map((pill) => (
        <span key={pill.key} className={styles.pill}>
          {pill.label}
          <button
            type="button"
            aria-label={`Remove ${pill.label} filter`}
            onClick={() => onRemove(pill.key)}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default FilterPills;
