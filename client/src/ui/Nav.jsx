import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <>
    <ul class="nav justify-content-center">
  <li class="nav-item">
  <Link to="/" class="nav-link">Home</Link>
  </li>
  <li class="nav-item">
  <Link to="/login" class="nav-link">Login</Link>
  </li>
  <li class="nav-item">
  <Link to="/cart" class="nav-link">Cart</Link>
  </li>
  <li class="nav-item">
  <Link to="/logout" class="nav-link">Logout</Link>
  </li>
</ul>
</>





    
  )
}