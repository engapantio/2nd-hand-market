// src/pages/MaintenancePage.jsx
import { useEffect, useState } from 'react';
import { useLazyGetProductByIdQuery } from '../../api/dummyApi.js';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  setInitialRows,
  addRow,
  toggleChecked,
  selectMaintenanceRows,
} from '../../features/maintenance/maintenanceSlice.js';
import MaintenanceTable from '../../components/MaintenanceTable/MaintenanceTable.jsx';
import styles from './maintenancePage.module.css';

const pick5RandomIds = () => {
  const ids = new Set();
  while (ids.size < 5) ids.add(Math.floor(Math.random() * 100) + 1);
  return [...ids];
};

const MaintenancePage = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector(selectMaintenanceRows);
  const [trigger] = useLazyGetProductByIdQuery();
  const [search, setSearch] = useState('');
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (rows.length > 0 || seeded) return;
    setSeeded(true);

    const ids = pick5RandomIds();
    Promise.all(ids.map((id) => trigger(id).unwrap()))
      .then((products) => dispatch(setInitialRows(products)))
      .catch(() => {});
  }, []);

  const handleAddItem = async () => {
    const existingIds = new Set(rows.map((r) => r.id));
    let id;
    do {
      id = Math.floor(Math.random() * 100) + 1;
    } while (existingIds.has(id));
    try {
      const product = await trigger(id).unwrap();
      dispatch(addRow(product));
    } catch (_e) {
      /* silent */
    }
  };
  const handleToggle = (id) => dispatch(toggleChecked(id));

  const filtered = search.trim()
    ? rows.filter((r) =>
        [r.title, r.brand, r.category]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(search.toLowerCase()))
      )
    : rows;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.title}>Maintain Items</h2>
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} width={16} height={16}>
                <use href="sprite.svg#icon-glass-grey"></use>
              </svg>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search items…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="button" className={styles.addBtn} onClick={handleAddItem}>
              Add an item
            </button>
          </div>
        </div>

        <div className={styles.tableCard}>
          <MaintenanceTable rows={filtered} onToggle={handleToggle} />
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
