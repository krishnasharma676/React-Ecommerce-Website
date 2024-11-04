import React, { useState, useEffect } from 'react';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        response = await response.json();
        if (response.user.name) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', JSON.stringify(response.auth));
          navigate('/');
        } else {
          alert("Please Enter Correct Details");
        }
      } catch (error) {
        console.error('Error:', error);
        setServerResponse('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Welcome</h2>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="input-wrapper">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete='off'
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="name">Email</label>
              {errors.email && <span className="err-span">{errors.email}</span>}
          </div>

          <div className="input-wrapper">
            <input
                type="password"
                name="password"
                id="password"
                autoComplete='off'
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              {errors.password && <p className="err-span">{errors.password}</p>}
          </div>
          <div className='btn-wrap pl-10 w-100'>
          <button type="submit" className="btn">Login</button>
          <Link to='/signup' className='btn'>New</Link>
          </div>

          {serverResponse && <p className="login-response-unique">{serverResponse}</p>}
        </form>
      </div>
    </div>
  );
};
