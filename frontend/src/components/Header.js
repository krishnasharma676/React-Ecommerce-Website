import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css'; // Import the CSS file

export const Header = () => {
    const navigate = useNavigate()
    const auth = localStorage.getItem('user')

    const logout = () => {
        navigate('/')
        localStorage.clear()
    }
    return (
        <div className="custom-header">
            <ul className="custom-nav-list">
                {
                    auth ?
                    <>
                    <li className="custom-nav-item"><Link to="/">Products</Link></li>
                    <li className="custom-nav-item"><Link to="/add">Add Product</Link></li>
                    {/* <li className="custom-nav-item"><Link to="/update">Update Product</Link></li> */}
                    <li className="custom-nav-item"><Link to="/profile">Profile</Link></li>
                    <li className="custom-nav-item"><Link onClick={logout} to='/login'>Logout</Link></li>
                    </>
                    :
                    <>
                    <li className="custom-nav-item"><Link to="/signup">Sign Up</Link></li>
                    <li className="custom-nav-item"><Link to="/login">Login</Link></li>
                    </>
                }
            </ul>
        </div>
    );
};
