import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTopFilter } from '../../features/ui/uiSlice';
import styles from '../../styles/topFilters.module.css';

const FILTERS = ['Women', 'Men', 'Unisex', 'Children', 'New'];

const TopFilters = () => {
  const dispatch = useAppDispatch();
  const activeTopFilter = useAppSelector((s) => s.ui.activeFilters.topFilter);

  const handleClick = (filter) => {
    const next = activeTopFilter === filter ? '' : filter;
    dispatch(setTopFilter(next));
  };

  return (
    <div className={styles.bar}>
      <ul className={styles.inner}>
        {FILTERS.map((f) => (
          <li
            key={f}
            className={`${styles.filter} ${activeTopFilter === f ? styles.active : ''}`}
            onClick={() => handleClick(f)}
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopFilters;
