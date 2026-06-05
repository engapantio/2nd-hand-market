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
import styles from '../../styles/modal.module.css';
import toast from 'react-hot-toast';

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
      toast('Admin logged in successfully');
    } catch (e) {
      // handled by error state
    }
  };

  return createPortal(
    <Modal onClose={() => dispatch(closeLogin())} title="Admin login">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label className={styles.field}>
            Username
            <input type="text" {...register('username')} />
          </label>
          {errors.username && <p>{errors.username.message}</p>}
        </fieldset>
        <fieldset>
          <label className={styles.field}>
            Password
            <input type="password" {...register('password')} />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </fieldset>
        {error && <p>Login failed</p>}
        <button type="submit" className={styles.loginBtn} disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </Modal>,
    document.getElementById('modal-root')
  );
};

export default LoginModal;
