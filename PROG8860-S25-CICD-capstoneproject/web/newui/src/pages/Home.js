// src/pages/Home.js
import React from 'react';
import Hero3D from '../components/Hero3D';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero3D />
      <Categories />
      <ProductList />
      <Footer />
    </div>
  );
}
