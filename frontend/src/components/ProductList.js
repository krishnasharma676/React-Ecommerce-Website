// ProductList.js
import React, { useEffect, useState } from 'react';
import './css/ProductList.css'; // Import the CSS file for this component
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products',{
                    headers : {
                        authorization : JSON.parse(localStorage.getItem('token'))
                    }
                }); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/product/${id}`, {
                method: 'DELETE',
                headers : {
                    authorization : JSON.parse(localStorage.getItem('token'))
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            // Update state to remove the deleted product
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleSearch = async (e) => {
        const key = e.target.value
        setSearchQuery(key)
        let result = await fetch(`http://localhost:5000/search/${key}`,{
            headers : {
                authorization : JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        if(result){
            setProducts(result)
        }
    };

    return (
        <div className="product-list-container"> {/* Unique class name */}
            <h2 className="product-list-title">Product List</h2> {/* Unique class name */}
            <input
                type="text"
                placeholder="Search for a product..."
                value={searchQuery}
                onInput={handleSearch}
                className="search-input"
            />
            <table className="product-table"> {/* Unique class name for table */}
                <thead>
                    <tr>
                        <th className="product-table-header">Name</th> {/* Unique class name */}
                        <th className="product-table-header">Price</th> {/* Unique class name */}
                        <th className="product-table-header">Category</th> {/* Unique class name */}
                        <th className="product-table-header">Company</th> {/* Unique class name */}
                        <th className="product-table-header">Actions</th> {/* Unique class name for actions */}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="product-table-row"> {/* Unique class name */}
                            <td className="product-name">{product.name}</td> {/* Unique class name */}
                            <td className="product-price">${product.price}</td> {/* Unique class name */}
                            <td className="product-category">{product.category}</td> {/* Unique class name */}
                            <td className="product-company">{product.company}</td> {/* Unique class name */}
                            <td>
                                <button
                                    className="delete-button btn"
                                    onClick={() => handleDelete(product._id)} // Call delete function
                                >
                                    Delete
                                </button>

                                <Link to={"/update/" + product._id} className='btn'>Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
