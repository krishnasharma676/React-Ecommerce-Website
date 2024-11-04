import React, { useEffect, useState } from 'react';
import './components/css/Signup.css';
import { json, useNavigate } from 'react-router-dom';
export const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            let result = await fetch('http://localhost:5000/signup', {
                method: 'post',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json()
            if (result){
                localStorage.setItem("user", JSON.stringify(result))
                navigate("/")
            }
        }
    };

    useEffect(()=>{
        const auth  = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })

    return (
        <div className="signup-wrapper-unique">
            <h2 className="signup-title-unique">Create Your Account</h2>
            <form onSubmit={handleSubmit} className="signup-form-unique">
                <div className="signup-field-unique">
                    <label htmlFor="name" className="signup-label-unique">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="signup-input-unique"
                    />
                    {errors.name && <p className="signup-error-unique">{errors.name}</p>}
                </div>

                <div className="signup-field-unique">
                    <label htmlFor="email" className="signup-label-unique">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="signup-input-unique"
                    />
                    {errors.email && <p className="signup-error-unique">{errors.email}</p>}
                </div>

                <div className="signup-field-unique">
                    <label htmlFor="password" className="signup-label-unique">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="signup-input-unique"
                    />
                    {errors.password && <p className="signup-error-unique">{errors.password}</p>}
                </div>

                <button type="submit" className="signup-button-unique">Sign Up</button>
            </form>
        </div>
    );
};
