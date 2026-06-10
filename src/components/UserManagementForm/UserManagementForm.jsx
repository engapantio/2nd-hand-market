import { Controller } from 'react-hook-form';
import FormField from '../common/FormField/FormField.jsx';
import RadioGroupField from '../common/RadioGroupField/RadioGroupField.jsx';
import SelectField from '../common/SelectField/SelectField.jsx';
import { SALUTATIONS, COUNTRIES, PAYPAL_OPTIONS } from '../../hooks/useUserManagementForm.js';
import styles from './userManagementForm.module.css';

const UserManagementForm = ({
  control,
  errors,
  isSubmitting,
  bindDraftField,
  handleClientChange,
  onSubmit,
  onCancel,
  onDelete,
}) => (
  <form className={styles.form} onSubmit={onSubmit}>
    <div className={styles.columns}>
      <div className={styles.column}>
        <FormField label="Client" required error={errors.client?.message}>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                inputMode="numeric"
                className={styles.input}
                placeholder="_ _ _ _ - _ _ _ _ - _ _ _ _ - _ _ _ _"
                value={field.value || ''}
                onChange={handleClientChange(field)}
              />
            )}
          />
        </FormField>

        <div className={styles.inlineFields}>
          <RadioGroupField
            name="archived"
            label="Archived"
            control={control}
            error={errors.archived?.message}
          />
          <RadioGroupField
            name="active"
            label="Active"
            control={control}
            error={errors.active?.message}
          />
        </div>

        <FormField label="Bring client number" required error={errors.bringClientNumber?.message}>
          <input
            {...bindDraftField('bringClientNumber')}
            className={styles.input}
            placeholder="_ _ _ _"
          />
        </FormField>

        <SelectField
          name="salutation"
          label="Salutation"
          control={control}
          error={errors.salutation?.message}
          placeholder="Salutation"
          options={SALUTATIONS}
        />

        <FormField label="Name" required error={errors.name?.message}>
          <input {...bindDraftField('name')} className={styles.input} placeholder="Name" />
        </FormField>

        <FormField label="First name" error={errors.firstName?.message}>
          <input {...bindDraftField('firstName')} className={styles.input} placeholder="Text" />
        </FormField>

        <FormField label="Email address" required error={errors.email?.message}>
          <input
            {...bindDraftField('email')}
            className={styles.input}
            placeholder="Email address"
          />
        </FormField>

        <FormField label="Phone number" error={errors.phone?.message}>
          <input
            {...bindDraftField('phone')}
            className={styles.input}
            placeholder="Phone address"
          />
        </FormField>
      </div>

      <div className={styles.column}>
        <FormField label="Mobile number" error={errors.mobile?.message}>
          <input
            {...bindDraftField('mobile')}
            className={styles.input}
            placeholder="Mobile number"
          />
        </FormField>

        <FormField label="Street" required error={errors.street?.message}>
          <input {...bindDraftField('street')} className={styles.input} placeholder="Street" />
        </FormField>

        <FormField label="Number" required error={errors.number?.message}>
          <input {...bindDraftField('number')} className={styles.input} placeholder="Text" />
        </FormField>

        <FormField label="ZIP code" required error={errors.zipCode?.message}>
          <input
            {...bindDraftField('zipCode')}
            className={styles.input}
            placeholder="ZIP code (4-5 digits)"
          />
        </FormField>

        <FormField label="City" required error={errors.city?.message}>
          <input {...bindDraftField('city')} className={styles.input} placeholder="City" />
        </FormField>

        <SelectField
          name="country"
          label="Country"
          required
          control={control}
          error={errors.country?.message}
          placeholder="Country"
          options={COUNTRIES}
        />

        <SelectField
          name="paypalAccount"
          label="Paypal account"
          control={control}
          error={errors.paypalAccount?.message}
          placeholder="Paypal account"
          options={PAYPAL_OPTIONS}
        />

        <FormField label="Contract signed" error={errors.contractSigned?.message}>
          <input
            {...bindDraftField('contractSigned')}
            className={styles.input}
            placeholder="Date signed"
          />
        </FormField>
      </div>

      <div className={styles.column}>
        <FormField label="Notes" error={errors.notes?.message}>
          <textarea {...bindDraftField('notes')} className={styles.textarea} placeholder="Notes" />
        </FormField>

        <RadioGroupField
          name="shipping"
          label="Shipping"
          control={control}
          error={errors.shipping?.message}
        />

        <FormField label="Sales quote" error={errors.salesQuote?.message}>
          <div className={styles.salesQuote}>
            <span>%</span>
            <input {...bindDraftField('salesQuote')} className={styles.input} placeholder="0" />
          </div>
        </FormField>

        <FormField label="Year of birth" error={errors.yearOfBirth?.message}>
          <div className={styles.dateInputWrap}>
            <input
              {...bindDraftField('yearOfBirth')}
              className={styles.input}
              placeholder="Year of birth"
            />
            <svg width={14} height={20} className={styles.dateIcon} aria-hidden="true">
              <use href="/sprite.svg#icon-calendar" />
            </svg>
          </div>
        </FormField>
      </div>
    </div>

    <div className={styles.actions}>
      <div className={styles.actionsLeft}>
        <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>

      <button type="button" className={styles.deleteBtn} onClick={onDelete}>
        Delete
      </button>
    </div>
  </form>
);

export default UserManagementForm;
