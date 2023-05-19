// NavBar.js
import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from './AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <nav>
    
    <ul className="menu">
      <Link href="/">Inicio</Link>
      <Link href="/account-resultado">Cuenta</Link>
    </ul>  
    {user && <div>Bienvenido, {user.email}</div>}
    {user && <button onClick={logout}>Desloguearse</button>}
  </nav>
  );
};

export default NavBar;
