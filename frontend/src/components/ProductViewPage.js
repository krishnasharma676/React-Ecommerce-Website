import React, { useState } from 'react';
import './css/ProductViewPage.css';

const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  description: "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology, comfortable over-ear design, and long-lasting battery life, these headphones are perfect for music enthusiasts and professionals alike.",
  price: 299.99,
  discountPrice: 249.99,
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400&text=Image+2",
    "/placeholder.svg?height=400&width=400&text=Image+3",
  ],
  colors: ["Black", "Silver", "Blue"],
  sizes: ["One Size"],
  rating: 4.5,
  reviews: 128
};

const initialComments = [
  { id: 1, user: "John Doe", date: "2023-05-15", content: "Great sound quality and comfortable to wear!", rating: 5 },
  { id: 2, user: "Jane Smith", date: "2023-05-10", content: "Good, but battery life could be better.", rating: 4 },
];

export default function ProductViewPage() {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState({ user: "", content: "", rating: 5 });

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart. Color: ${selectedColor}, Size: ${selectedSize}`);
  };

  const handleAddToWishlist = () => {
    console.log(`Added ${product.name} to wishlist`);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      id: comments.length + 1,
      user: newComment.user,
      date: new Date().toISOString().split('T')[0],
      content: newComment.content,
      rating: newComment.rating
    };
    setComments([...comments, comment]);
    setNewComment({ user: "", content: "", rating: 5 });
  };

  return (
    <div className="product-view">
      <div className="product-content">
        {/* Product Images */}
        <div className="product-images">
          <img src={mainImage} alt={product.name} className="main-image" />
          <div className="image-thumbnails">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} view ${index + 1}`}
                className="thumbnail"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <div className="price">
            <span className="discount-price">${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}</span>
            {product.discountPrice && <span className="original-price">${product.price.toFixed(2)}</span>}
          </div>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= product.rating ? 'star filled' : 'star'}>★</span>
            ))}
            <span>{product.rating} ({product.reviews} reviews)</span>
          </div>
          <p className="product-description">{product.description}</p>

          {/* Color Selection */}
          <div className="selection">
            <h3>Color</h3>
            <div className="options">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={color === selectedColor ? 'option selected' : 'option'}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="selection">
            <h3>Size</h3>
            <div className="options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={size === selectedSize ? 'option selected' : 'option'}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="quantity">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="actions">
            <button onClick={handleAddToCart} className="btn add-to-cart">Add to Cart</button>
            <button onClick={handleAddToWishlist} className="btn add-to-wishlist">Add to Wishlist</button>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="reviews">
        <h2>Customer Reviews</h2>
        <div className="comments">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>{comment.user}</strong>
                <span>{comment.date}</span>
              </div>
              <div className="comment-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= comment.rating ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>

        {/* Add a Review */}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <h3>Add a Review</h3>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newComment.user}
              onChange={(e) => setNewComment({ ...newComment, user: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <select
              value={newComment.rating}
              onChange={(e) => setNewComment({ ...newComment, rating: parseInt(e.target.value) })}
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div className="form-group">
            <label>Review:</label>
            <textarea
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn submit-review">Submit Review</button>
        </form>
      </div>
    </div>
  );
}
