// src/components/common/DropdownFilter.jsx
import { useRef, useState, useEffect } from 'react';
import styles from '../../styles/dropdownFilter.module.css';

const DropdownFilter = ({
  label,
  options = [],
  type = 'list',
  value,
  onChange,
  min = 0,
  max = 500,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (option) => {
    onChange?.(value === option ? '' : option);
    setOpen(false);
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {label} <span className={styles.caret}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown} role="listbox">
          {type === 'range' ? (
            <div className={styles.rangeWrapper}>
              <label>Min: {value?.[0] ?? min}</label>
              <input
                type="range"
                min={min}
                max={max}
                value={value?.[0] ?? min}
                onChange={(e) => onChange?.([+e.target.value, value?.[1] ?? max])}
              />
              <label>Max: {value?.[1] ?? max}</label>
              <input
                type="range"
                min={min}
                max={max}
                value={value?.[1] ?? max}
                onChange={(e) => onChange?.([value?.[0] ?? min, +e.target.value])}
              />
            </div>
          ) : options.length === 0 ? (
            <div className={styles.empty}>No options</div>
          ) : (
            options.map((opt) => (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={value === opt}
                className={`${styles.option} ${value === opt ? styles.selected : ''}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
