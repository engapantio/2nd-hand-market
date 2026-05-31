// src/components/common/DropdownFilter.jsx
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/dropdownFilter.module.css';

const DropdownFilter = ({
  label,
  options = [],
  type = 'list',
  value,
  onChange,
  min = 0,
  max = 500,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    if (!onChange) return;
    onChange(value === option ? '' : option);
    setOpen(false);
  };

  const handleRangeChange = (nextMin, nextMax) => {
    if (!onChange) return;
    onChange([nextMin, nextMax]);
  };

  const isRange = type === 'range';
  const currentMin = Array.isArray(value) ? value[0] : min;
  const currentMax = Array.isArray(value) ? value[1] : max;

  return (
    <div ref={ref} className={`${styles.wrapper} ${className ?? ''}`}>
      <button
        type="button"
        className={`${styles.trigger} ${
          disabled ? styles.triggerDisabled : ''
        } ${open ? styles.triggerOpen : ''}`}
        onClick={toggleOpen}
        aria-haspopup={isRange ? 'dialog' : 'listbox'}
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={styles.label}>{label}</span>
        <svg className={styles.caret} width={8} height={5} aria-hidden="true">
          <use href="/sprite.svg#icon-polygon" />
        </svg>
      </button>

      {open && !disabled && !isRange && (
        <ul className={styles.dropdown} role="listbox">
          {options.length === 0 ? (
            <li>No options</li>
          ) : (
            options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === option}
                  className={`${styles.option} ${value === option ? styles.selected : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {open && !disabled && isRange && (
        <div
          className={`${styles.dropdown} ${styles.rangeDropdown}`}
          role="group"
          aria-label={`${label} range`}
        >
          <div className={styles.rangeWrapper}>
            <label className={styles.rangeLabel}>Min: {currentMin}</label>
            <input
              type="range"
              min={min}
              max={max}
              value={currentMin}
              onChange={(e) => handleRangeChange(Number(e.target.value), currentMax)}
            />
            <label className={styles.rangeLabel}>Max: {currentMax}</label>
            <input
              type="range"
              min={min}
              max={max}
              value={currentMax}
              onChange={(e) => handleRangeChange(currentMin, Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
