import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">Cart</Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link">Logout</Link>
        </li>
      </ul>
    </>
  );
}
