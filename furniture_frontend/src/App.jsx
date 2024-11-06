import React, { useState, useEffect } from 'react';
import Navbar from './assets/components/Navbar';
import Home from './assets/components/Home';
import Login from './assets/components/Login';
import Signup from './assets/components/Signup';
import About from './assets/components/About';
import Contact from './assets/components/Contact';
import HomeProduct from './assets/components/HomeProduct';
import OfficeProduct from './assets/components/OfficeProduct';
import ProductDetail from './assets/components/ProductDetail';
import Cart from './assets/components/Cart';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddFurniture from './assets/components/AddFurniture';
import PrivateRoute from './assets/components/PrivateRoute';
import SuccessPage from './assets/components/SuccessPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    setIsAuthenticated(!!accessToken);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
  };

  return (
    <div className="bg-blur">
      <Router>
        <div className="blurred-background"></div>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          {!isAuthenticated && <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />}
          {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fun" element={<AddFurniture />} />
          <Route path="/home-product" element={<HomeProduct />} />
          <Route path="/office-product" element={<OfficeProduct />} />
          <Route path="/product-detail/:id" element={<PrivateRoute element={<ProductDetail />} isAuthenticated={isAuthenticated} />} />

          
          <Route
            path="/cart"
            element={<PrivateRoute element={<Cart />} isAuthenticated={isAuthenticated} />}
          />
          <Route path="/success" element={<SuccessPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
