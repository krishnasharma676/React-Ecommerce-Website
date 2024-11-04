import React from 'react';
import './css/Footer.css'; // Import the CSS file

export const Footer = () => {
  return (
    <div className="custom-footer">
      <div className="footer-social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
};
