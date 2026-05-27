import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../api/dummyApi';
import { setCredentials } from '../features/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, error }] = useLoginMutation();

  const [form, setForm] = useState({
    username: 'emilys',
    password: 'emilyspass',
  });

  const from = location.state?.from?.pathname || '/products';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(form).unwrap();
      dispatch(
        setCredentials({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user: result,
        })
      );
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Log in'}
        </button>
        {error && <p style={{ color: 'red' }}>Login error</p>}
      </form>
    </main>
  );
};

export default LoginPage;
