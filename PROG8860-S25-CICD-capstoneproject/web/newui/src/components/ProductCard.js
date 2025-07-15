// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css'; // For styles

const ProductCard = ({ product }) => {
  const { name, price, image } = product;

  return (
    <div className="product-card">
      <img
        src={image || 'https://via.placeholder.com/200x200?text=Robot'}
        alt={name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{name}</h3>
        <p>${price.toFixed(2)}</p>
        <button className="buy-button">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
