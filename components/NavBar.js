// components/NavBar.js
import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  
  return (
    <nav>
    
    <ul class="menu">
      <Link href="/">Inicio</Link>
      <Link href="/account-resultado">Cuenta</Link>
    </ul>   
  </nav>
  );
};

export default NavBar;
