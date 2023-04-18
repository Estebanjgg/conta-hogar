// components/NavBar.js
import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  
  return (
    <nav>
    <Link href="#" class="logo">Logo</Link>
    <ul class="menu">
      <Link href="/">Inicio</Link>
      <Link href="/account-resultado">Cuenta</Link>
    </ul>
    <div class="toggle"></div>
  </nav>
  );
};

export default NavBar;
