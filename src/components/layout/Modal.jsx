import { useEffect } from 'react';
import styles from '../../styles/modal.module.css';

const Modal = ({ onClose, title, children }) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.box} role="dialog" aria-modal="true" aria-label={title}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <svg
            width={20}
            height={20}
            className={styles.closeBtn}
            aria-label="Close"
            onClick={onClose}
          >
            <use href="sprite.svg#icon-dismiss"></use>
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
