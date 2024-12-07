import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



export default function Nav() {
  const [user, setUser]=useState('');
    useEffect(()=>{
      async function getUserSession() {
        const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl= apiHost + '/api/users/getsession';
    const response =await fetch(url,{
      method: "GET",
      credentials: 'include'
    });

    if(response.ok){
      const data =await response.json();
      setUser(data.user)
    }
        
      }
    })





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
      <div>
        <p>User: {user.email}</p>
      </div>
    </>
  );
}
