import React, { useEffect } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  box: {
    background: 'white',
    borderRadius: 16,
    padding: '32px 28px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: 22,
    cursor: 'pointer',
    color: '#888',
    lineHeight: 1,
  },
};

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
      style={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={styles.box} role="dialog" aria-modal="true" aria-label={title}>
        <div style={styles.header}>
          <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
          <button type="button" style={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
