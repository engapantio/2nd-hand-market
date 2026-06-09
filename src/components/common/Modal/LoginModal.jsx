import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../api/dummyApi.js';
import { useAppDispatch } from '../../../app/hooks.js';
import { closeLogin } from '../../../features/ui/uiSlice.js';
import Modal from './Modal.jsx';
import styles from './modal.module.css';
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
    } catch (_e) {}
  };

  return createPortal(
    <Modal onClose={() => dispatch(closeLogin())} title="Admin login">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldGroup}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" {...register('username')} />
          {/* errorSlot always rendered — no layout jump */}
          <span className={styles.errorSlot}>{errors.username?.message}</span>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          <span className={styles.errorSlot}>{errors.password?.message}</span>
        </div>

        {/* Server error slot — always rendered */}
        <span className={styles.serverError}>
          {error ? 'Login failed. Please check your credentials.' : ''}
        </span>

        <button type="submit" className={styles.loginBtn} disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </Modal>,
    document.getElementById('modal-root')
  );
};

export default LoginModal;
