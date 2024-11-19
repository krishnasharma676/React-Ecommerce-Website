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
        productImage: null,
        userId: userId,
        count: 0,
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

        // Create a FormData object
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('company', formData.company);
        formDataToSend.append('productImage', formData.productImage); // Append the image file
        formDataToSend.append('count', formData.count); // Append the image file

        try {
            const response = await fetch('http://localhost:5000/add-product', {
                method: 'POST',
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token')),
                },
                body: formDataToSend, // Send the FormData
            });

            const result = await response.json();
            if (response.ok) {
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
        <div className="product-add-container">
            <h2 className="product-add-title">Add New Product</h2>
            <form onSubmit={handleSubmit} className="product-add-form">

                <div className="product-add-grid">
                    <div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter product price"
                        />
                        {errors.price && <span className="error-message">{errors.price}</span>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                        />
                        {errors.category && <span className="error-message">{errors.category}</span>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="company"
                            id="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Enter company name"
                        />
                        {errors.company && <span className="error-message">{errors.company}</span>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="count"
                            id="count"
                            value={formData.count}
                            onChange={handleChange}
                            placeholder="Enter Stock Count"
                        />
                    </div>

                    <div>
                        <input
                            type="file"
                            name="productImage"
                            id="productImage"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='btn-wrap pl-10 pb-20 w-100'>
                    <button type="submit" className="btn submit-button">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
