// src/components/layout/LoginModal.jsx
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/dummyApi.js';
import { useAppDispatch } from '../../app/hooks.js';
import { closeLogin } from '../../features/ui/uiSlice.js';
import Modal from './Modal';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: 'oliviaw',
      password: 'oliviawpass',
    },
  });

  const onSubmit = async (values) => {
    try {
      await login(values).unwrap();
      dispatch(closeLogin());
      navigate('/maintenance');
    } catch (e) {
      // handled by error state
    }
  };

  return createPortal(
    <Modal onClose={() => dispatch(closeLogin())} title="Admin login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Username
            <input type="text" {...register('username')} />
          </label>
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>
            Password
            <input type="password" {...register('password')} />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        {error && <p>Login failed</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </Modal>,
    document.getElementById('modal-root')
  );
};

export default LoginModal;
