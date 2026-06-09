// src/pages/UserManagementPage.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/widgets/Breadcrumbs/Breadcrumbs.jsx';
import FormField from '../../components/common/FormField/FormField.jsx';
import RadioGroupField from '../../components/common/RadioGroupField/RadioGroupField.jsx';
import SelectField from '../../components/common/SelectField/SelectField.jsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  initialDraft,
  resetDraft,
  setDraftField,
  submitFailure,
  submitStart,
  submitSuccess,
} from '../../features/userManagement/userManagementSlice.js';
import { userManagementSchema } from '../../schemas/userManagementSchema.js';
import { useAddUserMutation } from '../../api/dummyApi.js';
import styles from './userManagement.module.css';

const SALUTATIONS = ['Mr.', 'Mrs.', 'Ms.', 'Dr.'];
const COUNTRIES = ['Germany', 'Austria', 'France', 'Italy'];
const PAYPAL_OPTIONS = ['Paypal account', 'Private Paypal', 'Business Paypal'];

const UserManagementPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const draft = useAppSelector((s) => s.userManagement.draft);
  const isSubmitting = useAppSelector((s) => s.userManagement.isSubmitting);
  const [addUser] = useAddUserMutation();
  const breadcrumbs = [
    { label: 'User Management', to: '/user-management' },
    { label: 'List of Bringing Customers' },
  ];
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userManagementSchema),
    defaultValues: draft,
    mode: 'onBlur',
  });

  const bindDraftField = (name) => {
    const base = register(name);
    return {
      ...base,
      onChange: (e) => {
        base.onChange(e);
        dispatch(setDraftField({ key: name, value: e.target.value }));
      },
    };
  };

  const onSubmit = async (values) => {
    dispatch(submitStart());
    try {
      const result = await addUser(values).unwrap();
      dispatch(submitSuccess(result));
      navigate('/user-management');
    } catch (_e) {
      dispatch(submitFailure());
    }
  };

  const handleCancel = () => {
    dispatch(resetDraft());
    navigate('/maintenance');
  };

  const handleDelete = () => {
    dispatch(resetDraft());
    reset(initialDraft);
  };

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbsWrap}>
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className={styles.card}>
        <h1 className={styles.title}>Add New User</h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <FormField label="Client" required error={errors.client?.message}>
                <input
                  {...bindDraftField('client')}
                  className={styles.input}
                  placeholder="_ _ _ _ - _ _ _ _ - _ _ _ _ - _ _ _ _"
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

              <FormField
                label="Bring client number"
                required
                error={errors.bringClientNumber?.message}
              >
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
                <input
                  {...bindDraftField('firstName')}
                  className={styles.input}
                  placeholder="Text"
                />
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
                <input
                  {...bindDraftField('street')}
                  className={styles.input}
                  placeholder="Street"
                />
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
                  {...register('contractSigned')}
                  className={styles.input}
                  placeholder="Date signed"
                />
              </FormField>
            </div>

            <div className={styles.column}>
              <FormField label="Notes" error={errors.notes?.message}>
                <textarea
                  {...bindDraftField('notes')}
                  className={styles.textarea}
                  placeholder="Notes"
                />
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
                  <input
                    {...bindDraftField('salesQuote')}
                    className={styles.input}
                    placeholder="0"
                  />
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
              <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
            </div>

            <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UserManagementPage;
