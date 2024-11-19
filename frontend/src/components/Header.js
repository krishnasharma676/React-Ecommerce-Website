import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css'; // Import the CSS file

export const Header = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const user = auth ? JSON.parse(auth) : null; // Parse only if auth is truthy
    const loginUserType = user ? user.usertype : null; // Safely access usertype
    

    const logout = () => {
        navigate('/');
        localStorage.clear();
    };

    return (
        <div className="custom-header">
            <img src='' alt='logo'/>
            <ul className="custom-nav-list">
                {
                    auth ? (
                        <>
                            <li className="custom-nav-item"><Link onClick={logout} to='/login'>Logout</Link></li>
                            
                            {/* Conditional rendering based on usertype */}
                            {loginUserType === 'admin' && (
                                <>
                                    <li className="custom-nav-item"><Link to="/">Products List</Link></li>
                                    <li className="custom-nav-item"><Link to="/add">Add Product</Link></li>
                                </>
                            )}
                            {loginUserType === 'customer' && (
                                <>
                                    <li className="custom-nav-item"><Link to="/orders">My Orders</Link></li>
                                    <li className="custom-nav-item"><Link to="/ProductsShow">Products</Link></li>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <li className="custom-nav-item"><Link to="/signup">Sign Up</Link></li>
                            <li className="custom-nav-item"><Link to="/login">Login</Link></li>
                        </>
                    )
                }
            </ul>
        </div>
    );
};
