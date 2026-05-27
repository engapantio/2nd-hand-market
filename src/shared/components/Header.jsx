import { Link, NavLink } from 'react-router-dom';

const Header = ({ variant = 'main' }) => {
  const isAdmin = variant === 'admin';

  return (
    <header
      style={{
        padding: '1rem 2rem',
        backgroundColor: isAdmin ? '#4b4b5c' : '#f75b63',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/products">2nd Hand Market</Link>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        {!isAdmin && (
          <>
            <NavLink to="/products">Catalog</NavLink>
          </>
        )}
        {isAdmin && (
          <>
            <NavLink to="/admin/products">Admin products</NavLink>
            <NavLink to="/admin/products/new">Add product</NavLink>
          </>
        )}
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  );
};

export default Header;
