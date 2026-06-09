import { Controller } from 'react-hook-form';
import { useAppDispatch } from '../../../app/hooks.js';
import { setDraftField } from '../../../features/userManagement/userManagementSlice.js';
import FormField from '../FormField/FormField.jsx';
import styles from './selectField.module.css';

const SelectField = ({
  name,
  label,
  control,
  error,
  required = false,
  placeholder,
  options = [],
}) => {
  const dispatch = useAppDispatch();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormField label={label} required={required} error={error}>
          <select
            name={field.name}
            ref={field.ref}
            value={field.value ?? ''}
            onBlur={field.onBlur}
            className={styles.select}
            onChange={(e) => {
              field.onChange(e.target.value);
              dispatch(setDraftField({ key: name, value: e.target.value }));
            }}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => {
              const value = typeof option === 'string' ? option : option.value;
              const text = typeof option === 'string' ? option : option.label;
              return (
                <option key={value} value={value}>
                  {text}
                </option>
              );
            })}
          </select>
        </FormField>
      )}
    />
  );
};

export default SelectField;
