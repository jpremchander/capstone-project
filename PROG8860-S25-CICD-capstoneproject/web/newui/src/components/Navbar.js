// src/components/Navbar.jsx
import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white shadow-md">
      <h1 className="text-xl font-bold">Robot Shop</h1>
      <ul className="flex gap-6">
        <li className="hover:underline cursor-pointer">Home</li>
        <li className="hover:underline cursor-pointer">Cart</li>
        <li className="hover:underline cursor-pointer">Login</li>
      </ul>
    </nav>
  );
}
