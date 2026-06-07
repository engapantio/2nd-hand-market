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
  const [draftRange, setDraftRange] = useState(Array.isArray(value) ? value : [min, max]);
  const rangeRef = useRef(Array.isArray(value) ? value : [min, max]);
  const ref = useRef(null);

  useEffect(() => {
    if (Array.isArray(value)) {
      setDraftRange(value);
      rangeRef.current = value;
    }
  }, [value]);

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
    if (!disabled) setOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    if (!onChange) return;
    onChange(value === option ? '' : option);
    setOpen(false);
  };

  const handleRangeChange = (nextMin, nextMax) => {
    const clamped = [Math.min(nextMin, nextMax), Math.max(nextMin, nextMax)];
    setDraftRange(clamped);
    rangeRef.current = clamped;
  };

  const handleRangeCommit = () => {
    if (!onChange) return;
    onChange(rangeRef.current);
  };

  const isRange = type === 'range';
  const currentMin = draftRange[0];
  const currentMax = draftRange[1];

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
              onPointerUp={handleRangeCommit}
              onTouchEnd={handleRangeCommit}
            />
            <label className={styles.rangeLabel}>Max: {currentMax}</label>
            <input
              type="range"
              min={min}
              max={max}
              value={currentMax}
              onChange={(e) => handleRangeChange(currentMin, Number(e.target.value))}
              onPointerUp={handleRangeCommit}
              onTouchEnd={handleRangeCommit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
