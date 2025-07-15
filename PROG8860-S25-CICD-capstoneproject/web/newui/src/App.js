import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spline from '@splinetool/react-spline';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/catalogue')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Hero Section with Spline Robot */}
      <div style={{ height: '80vh', position: 'relative' }}>
        <Spline scene="https://prod.spline.design/8aBnLqLQo70Wzb0s/scene.splinecode" />
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'white',
          padding: '10px 20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}>
          Welcome to Stan’s Robot Shop
        </div>
      </div>

      {/* Product Listing */}
      <div style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Shop Now</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          {products.map(product => (
            <div key={product._id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              background: '#fafafa',
              textAlign: 'center',
            }}>
              <img
                src="https://via.placeholder.com/150"
                alt={product.name}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button style={{
                marginTop: '10px',
                padding: '10px 20px',
                background: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
