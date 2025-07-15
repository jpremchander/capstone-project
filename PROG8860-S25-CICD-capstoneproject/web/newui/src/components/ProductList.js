// src/components/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products }) => {
  return (
    <section className="product-section">
      <h2>Shop All Robots</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
