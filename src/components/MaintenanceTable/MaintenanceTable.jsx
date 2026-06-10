import { getCategoryLabel, getStatus } from '../../utils/categoryLabel.js';
import styles from './MaintenanceTable.module.css';

const STATUS_CLASS = {
  'In Sale': 'statusInSale',
  'In Progress': 'statusInProgress',
  Locked: 'statusLocked',
  Reserved: 'statusReserved',
  Sold: 'statusSold',
  'Closed Out': 'statusClosed',
};

const MaintenanceTable = ({ rows, onToggle, onToggleAll }) => {
  if (!rows.length) {
    return <p className={styles.empty}>No items found.</p>;
  }

  const allChecked = rows.length > 0 && rows.every((row) => row.checked);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={allChecked}
                onChange={() => onToggleAll(!allChecked)}
                aria-label={allChecked ? 'Uncheck all rows' : 'Check all rows'}
              />
            </th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Items</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Subcategory</th>
            <th className={styles.th}>Storage</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const cls = STATUS_CLASS[getStatus(row)];
            return (
              <tr
                key={row.id}
                className={`${styles.tr} ${row.checked ? styles.trChecked : ''} ${getStatus(row) === 'Closed Out' ? styles.trClosedOut : ''}`}
              >
                <td className={styles.td}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={row.checked}
                    onChange={() => onToggle(row.id)}
                  />
                </td>
                <td className={styles.td}>
                  <div className={styles.nameCell}>
                    <img
                      src={row.thumbnail}
                      alt={row.title}
                      width={36}
                      height={36}
                      className={styles.thumbnail}
                      loading="lazy"
                    />
                    <span>{row.title}</span>
                  </div>
                </td>
                <td className={styles.td}>{row.stock}</td>
                <td className={styles.td}>{getCategoryLabel(row.category)}</td>
                <td className={styles.td}>
                  {row.subcategory ? getCategoryLabel(row.subcategory) : '—'}
                </td>
                <td className={styles.td}>Austria 459 Maudie Islands Suite 854</td>
                <td className={styles.td}>
                  <span className={`${styles[cls]}`}>{getStatus(row)}</span>
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
