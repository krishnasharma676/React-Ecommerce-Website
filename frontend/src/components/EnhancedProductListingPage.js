import React, { useState,useEffect } from 'react';
import './css/EnhancedProductListingPage.css';

const initialProducts = [
  { id: 1, name: 'Smartphone X', description: 'Latest model with advanced features', price: 999.99, imageUrl: '', category: 'Electronics', isTrending: true },
  { id: 2, name: 'Laptop Pro', description: 'High-performance laptop for professionals', price: 1499.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Electronics', isHot: true },
  { id: 3, name: 'Wireless Headphones', description: 'Noise-cancelling with long battery life', price: 249.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Electronics', isTrending: true, isHot: true },
  { id: 4, name: '4K Smart TV', description: 'Ultra HD resolution with smart features', price: 799.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Electronics' },
  { id: 5, name: 'Fitness Tracker', description: 'Track your health and fitness goals', price: 99.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Wearables', isTrending: true },
  { id: 6, name: 'Digital Camera', description: 'High-quality photos and 4K video', price: 699.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Electronics' },
  { id: 7, name: 'Gaming Console', description: 'Next-gen gaming experience', price: 499.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Gaming', isHot: true },
  { id: 8, name: 'Smartwatch', description: 'Stay connected on the go', price: 299.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Wearables', isTrending: true },
  { id: 9, name: 'Bluetooth Speaker', description: 'Portable with amazing sound quality', price: 129.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Audio' },
  { id: 10, name: 'Tablet', description: 'Versatile and powerful', price: 399.99, imageUrl: '/placeholder.svg?height=200&width=200', category: 'Electronics', isHot: true },
];

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.imageUrl} alt={product.name} className="product-image" />
    <h3 className="product-name">{product.name}</h3>
    <p className="product-description">{product.description}</p>
    <p className="product-price">${product.price.toFixed(2)}</p>
    <button className="add-to-cart-btn">Add to Cart</button>
    {product.isTrending && <span className="product-badge trending">Trending</span>}
    {product.isHot && <span className="product-badge hot">Hot</span>}
  </div>
);

export default function EnhancedProductListingPage() {
  const [products] = useState(initialProducts);

  const trendingProducts = products.filter((p) => p.isTrending);
  const hotProducts = products.filter((p) => p.isHot);


  return (
    <div className="product-listing-page">
      <div className="page-content">
        {/* Main Content */}
        <div className="main-content">
          <section className="product-section">
            <h2 className="section-title">Trending Products</h2>
            <div className="product-grid">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section className="product-section">
            <h2 className="section-title">Hot Products</h2>
            <div className="product-grid">
              {hotProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section className="product-section">
            <h2 className="section-title">All Products</h2>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <section className="product-section">
            <h2 className="section-title">Featured Product</h2>
            <ProductCard product={products[0]} />
          </section>

          <section className="product-section">
            <h2 className="section-title">Recent Products</h2>
            <div className="recent-products">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="recent-product-card">
                  <img src={product.imageUrl} alt={product.name} className="recent-product-image" />
                  <div>
                    <h4 className="recent-product-name">{product.name}</h4>
                    <p className="recent-product-price">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
