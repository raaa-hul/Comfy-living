import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import './Navbar.css'; // Import the CSS file

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    onLogout(); // Call the passed onLogout function
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-100">
      {/* Left side: Logo and Navigation */}
      <div className="flex items-center">
        {/* Logo Image */}
        <img
          src="/logo.png"
          alt="Comfy Living Logo"
          className="h-10 w-auto mr-2"
        />
        {/* Brand Name */}
        <div className="text-lg font-bold mr-8">Comfy Living</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className={`navbar-link navbar-transition`}>
                Home
              </NavLink>
            </li>
            <li className="relative group">
              {/* Dropdown for Products */}
              <button className="flex items-center focus:outline-none navbar-link navbar-transition">
                Products
                <img
                  src="/arrow.png"
                  alt="Arrow"
                  className="ml-1 h-2 w-2"
                  style={{ marginTop: "2px" }}
                />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute left-0 w-40 bg-white border rounded shadow-lg z-10 hidden group-hover:block">
                <NavLink
                  to="/office-product"
                  className={`dropdown-link navbar-transition block px-4 py-2`}
                >
                  Office Products
                </NavLink>
                <NavLink
                  to="/home-product"
                  className={`dropdown-link navbar-transition block px-4 py-2`}
                >
                  Home Products
                </NavLink>
              </div>
            </li>
            <li>
              <NavLink to="/about" className={`navbar-link navbar-transition`}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={`navbar-link navbar-transition`}>
                Contact Us
              </NavLink>
            </li>
            <li>
              {/* <NavLink to="/fun" className={`navbar-link navbar-transition`}>
                Add Furniture
              </NavLink> */}
            </li>
          </ul>
        </nav>
      </div>

      {/* Right side: Conditional Login/Signup or Logout button */}
      <div className="flex space-x-4">
        <NavLink
          to="/cart" // Link to the cart page
          className="px-4 py-2 rounded hover:bg-orange-300 transition flex items-center"
        >
          <img src="/cart.png" alt="Cart" className="h-7 w-7 mr-2" /> {/* Cart icon */}
        </NavLink>
        {isAuthenticated ? (
          <button onClick={handleLogout} className={`btn-logout navbar-transition px-4 py-2 rounded`}>
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className={`btn-login navbar-transition px-4 py-2 rounded`}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={`btn-signup navbar-transition px-4 py-2 rounded`}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
