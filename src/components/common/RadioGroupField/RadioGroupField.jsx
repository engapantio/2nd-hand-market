import { Controller } from 'react-hook-form';
import FormField from '../FormField/FormField.jsx';
import { useAppDispatch } from '../../../app/hooks.js';
import { setDraftField } from '../../../features/userManagement/userManagementSlice.js';
import styles from './radioGroupField.module.css';

const RadioGroupField = ({
  name,
  label,
  control,
  error,
  options = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
}) => {
  const dispatch = useAppDispatch();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormField label={label} error={error}>
          <div className={styles.radioGroup}>
            {options.map((option) => {
              const inputId = `${name}-${option.value}`;
              return (
                <div key={option.value} className={styles.radioItem}>
                  <input
                    id={inputId}
                    name={field.name}
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      dispatch(setDraftField({ key: name, value: e.target.value }));
                    }}
                    className={styles.radioInput}
                  />
                  <label htmlFor={inputId} className={styles.radioLabel}>
                    <span className={styles.radioControl} aria-hidden="true" />
                    <span className={styles.radioText}>{option.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </FormField>
      )}
    />
  );
};

export default RadioGroupField;
