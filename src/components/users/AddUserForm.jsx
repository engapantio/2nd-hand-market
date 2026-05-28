// src/components/users/AddUserForm.jsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const schema = z.object({
  client: z.string().min(1, 'Client is required'),
  street: z.string().min(1),
  zip: z.string().min(4),
  city: z.string().min(1),
  country: z.string().min(1),
  email: z.string().email(),
  notes: z.string().optional(),
});

const defaultValues = {
  client: '',
  street: '',
  zip: '',
  city: '',
  country: '',
  email: '',
  notes: '',
};

const AddUserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSave = (_data) => {
    // simulate save
    toast.success('User saved');
    reset(defaultValues);
  };

  const handleCancel = () => {
    toast('Changes canceled');
    reset(defaultValues);
  };

  const handleDelete = () => {
    toast.error('User deleted');
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="grid">
        <div>
          <label>
            Client *
            <input {...register('client')} />
          </label>
          {errors.client && <p>{errors.client.message}</p>}
        </div>
        <div>
          <label>
            Street *
            <input {...register('street')} />
          </label>
        </div>
        {/* add other fields mapped from Figma as needed */}
        <div>
          <label>
            Email *
            <input {...register('email')} />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>
            Notes
            <textarea {...register('notes')} />
          </label>
        </div>
      </div>

      <div className="button-row">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
