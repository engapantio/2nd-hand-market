import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nabar">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
};

export default Navbar;
