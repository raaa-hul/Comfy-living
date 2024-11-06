import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/login/', {
        username: username,
        password: password,
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      console.log("Access token : ",response.data.access);
      console.log("Refresh token : ",response.data.refresh);

      onLoginSuccess();
      setSuccessMessage("Login successful! Redirecting...");

      // Redirect to the previous page (if any) or to the homepage
      const redirectPath = location.state?.from || '/';
      navigate(redirectPath, { replace: true });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.detail || "Login failed. Please check your credentials.");
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-4">Login</h1>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your username"
              className="w-full p-2 border border-gray-300 rounded"
              required
              value={username}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              className="w-full p-2 border border-gray-300 rounded"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 w-full">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

