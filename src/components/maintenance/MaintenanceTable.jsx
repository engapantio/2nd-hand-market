import React from 'react';
import styles from '../../styles/maintenance.module.css';

const STATUSES = ['In Sale', 'In Progress', 'Locked', 'Reserved', 'Sold'];
const STATUS_CLASS = {
  'In Sale': 'statusInSale',
  'In Progress': 'statusInProgress',
  Locked: 'statusLocked',
  Reserved: 'statusReserved',
  Sold: 'statusSold',
};

const MaintenanceTable = ({ rows = [] }) => {
  if (!rows.length) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.emptyState}>
          <p>No items yet. Click "Add an item" to add products.</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Items</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Subcategory</th>
            <th className={styles.th}>Storage</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((product, idx) => {
            const status = STATUSES[idx % STATUSES.length];
            const cls = STATUS_CLASS[status] || 'statusClosed';
            return (
              <tr key={`${product.id}-${idx}`}>
                <td className={styles.td}>
                  <div className={styles.nameCell}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className={styles.thumbnail}
                      loading="lazy"
                    />
                    <span>{product.title}</span>
                  </div>
                </td>
                <td className={styles.td}>1</td>
                <td className={styles.td}>{product.category}</td>
                <td className={styles.td}>{product.category}</td>
                <td className={styles.td}>Austria 459 Maudie Islands Suite 854</td>
                <td className={styles.td}>
                  <span className={`${styles.statusBadge} ${styles[cls]}`}>{status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceTable;
