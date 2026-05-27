import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>404 – Page not found</h1>
      <p>
        <Link to="/products">Go back to catalog</Link>
      </p>
    </main>
  );
}
