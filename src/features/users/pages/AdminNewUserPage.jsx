import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddUserMutation } from '../../../api/dummyApi';

const newUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(5, 'Phone is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  isActive: z.boolean().optional(),
});

const AdminNewUserPage = () => {
  const [serverError, setServerError] = useState('');
  const [addUser, { isLoading }] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      isActive: true,
    },
  });

  const onSubmit = async (values) => {
    setServerError('');

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: {
        address: values.street,
        city: values.city,
        postalCode: values.postalCode,
        country: values.country,
      },
      // optional metadata to tag this as an admin user
      company: {
        department: 'Admin',
        title: 'Administrator',
      },
      // you can also send isActive as a custom flag
      isActive: Boolean(values.isActive),
    };

    try {
      const created = await addUser(payload).unwrap();
      console.log('Created user:', created);
      reset();
    } catch (error) {
      console.error('Add user failed', error);
      setServerError('Failed to create user. Please try again.');
    }
  };

  const disabled = isSubmitting || isLoading;

  return (
    <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1>Add New Admin User</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          marginTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '1rem 2rem',
          backgroundColor: '#ffffff',
          padding: '1.5rem 2rem',
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div>
          <label>
            First name
            <input {...register('firstName')} type="text" style={{ width: '100%', marginTop: 4 }} />
          </label>
          {errors.firstName && (
            <p style={{ color: 'red', fontSize: 12 }}>{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label>
            Last name
            <input {...register('lastName')} type="text" style={{ width: '100%', marginTop: 4 }} />
          </label>
          {errors.lastName && (
            <p style={{ color: 'red', fontSize: 12 }}>{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label>
            Email
            <input {...register('email')} type="email" style={{ width: '100%', marginTop: 4 }} />
          </label>
          {errors.email && <p style={{ color: 'red', fontSize: 12 }}>{errors.email.message}</p>}
        </div>

        <div>
          <label>
            Phone
            <input {...register('phone')} type="tel" style={{ width: '100%', marginTop: 4 }} />
          </label>
          {errors.phone && <p style={{ color: 'red', fontSize: 12 }}>{errors.phone.message}</p>}
        </div>

        <div>
          <label>
            Street
            <input {...register('street')} type="text" style={{ width: '100%', marginTop: 4 }} />
          </label>
          {errors.street && <p style={{ color: 'red', fontSize: 12 }}>{errors.street.message}</p>}
        </div>

        <div>
          <label>
            City
            <input {...register('city')} type="text" style={{ width: '100%', marginTop: 4 }} />
          </label>
          {errors.city && <p style={{ color: 'red', fontSize: 12 }}>{errors.city.message}</p>}
        </div>

        <div>
          <label>
            Postal code
            <input
              {...register('postalCode')}
              type="text"
              style={{ width: '100%', marginTop: 4 }}
            />
          </label>
          {errors.postalCode && (
            <p style={{ color: 'red', fontSize: 12 }}>{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <label>
            Country
            <input {...register('country')} type="text" style={{ width: '100%', marginTop: 4 }} />
          </label>
          {errors.country && <p style={{ color: 'red', fontSize: 12 }}>{errors.country.message}</p>}
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input {...register('isActive')} type="checkbox" defaultChecked />
            Active user
          </label>
        </div>

        {serverError && (
          <div style={{ gridColumn: '1 / -1', color: 'red', fontSize: 13 }}>{serverError}</div>
        )}

        <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
          <button type="submit" disabled={disabled}>
            {disabled ? 'Saving…' : 'Create admin user'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AdminNewUserPage;
