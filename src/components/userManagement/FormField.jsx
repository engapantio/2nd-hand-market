import styles from '../../styles/userManagement.module.css';

const FormField = ({ label, required = false, error, children }) => (
  <div className={styles.field}>
    <div className={styles.label}>
      {label}
      {required && ' *'}
    </div>
    {children}
    {error ? <p className={styles.error}>{error}</p> : null}
  </div>
);

export default FormField;
