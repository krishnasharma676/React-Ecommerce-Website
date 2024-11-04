import React, { useState } from 'react';
import './css/AddProduct.css';

const AddProduct = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null; 

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        company: '',
        userId: userId,
    });

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value, // Capture file input for product image
        });
    };

    // Basic validation
    const validate = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = 'Product name is required';
        if (!formData.price) formErrors.price = 'Price is required';
        if (!formData.category) formErrors.category = 'Category is required';
        if (!formData.company) formErrors.company = 'Company is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            // Create a plain object instead of using FormData
            const data = {
                name: formData.name,
                price: formData.price,
                category: formData.category,
                company: formData.company,
                userId: formData.userId,
            };

            // Use fetch to send the data as JSON
            const response = await fetch('http://localhost:5000/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify(data), // Convert the object to a JSON string
            });

            const result = await response.json();
            if (response.ok) { // Check if the response is successful
                alert('Product added successfully');
                setFormData({ name: '', price: '', category: '', productImage: null, company: '' });
            } else {
                alert('Failed to add product: ' + result.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    return (
        <div className="add-product-container">
            <h2 className="add-product-title">Add Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="name">Product Name</label>
                    {errors.name && <span className="err-span">{errors.name}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="name">Price</label>
                    {errors.price && <span className="err-span">{errors.price}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="category">Category</label>
                    {errors.category && <span className="err-span">{errors.category}</span>}
                </div>


                <div className="input-wrapper">
                    <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="company">Company</label>
                    {errors.company && <span className="err-span">{errors.company}</span>}
                </div>

                <button type="submit" className="btn">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
