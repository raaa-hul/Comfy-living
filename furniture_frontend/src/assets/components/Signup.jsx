import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setSuccessMessage(''); // Clear success message if there's an error
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', {
        username: name,
        email: email,
        password: password,
      });
      setSuccessMessage("Registration successful! Redirecting to login...");
      setErrorMessage('');

      // Automatically redirect after a delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate('/login'); // Redirect to the login page
      }, 1000);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      setSuccessMessage('');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-4">Sign Up</h1>
        <p className="text-center mb-6">Create your account by filling out the form below:</p>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>} {/* Display success message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 border border-gray-300 rounded"
              required
              value={email}
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
          <div className="mb-4">
            <label htmlFor="confirm_password" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Your Password"
              className="w-full p-2 border border-gray-300 rounded"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 w-full">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
