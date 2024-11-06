import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/furniture/${id}/`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Retrieve the existing cart from localStorage, or set an empty array if none exists
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If the product exists, update its quantity
      existingProduct.quantity += 1;
    } else {
      // Add the product with quantity 1 if it's not already in the cart
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the UI to show the product was added
    setIsAddedToCart(true);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <h1 className="text-4xl">{error}</h1>
          <h1 className="text-4xl font-bold text-red-600">X</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex p-4 space-x-6">
      <div className="flex-none">
        <img src={product.image_url} alt={product.name} className="w-80 h-auto shadow-md" />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-lg mt-2">{product.description}</p>
        <span className="font-bold text-xl mt-4">{`Rs. ${product.price}`}</span><br />
        <button
          onClick={handleAddToCart}
          className={`mt-4 p-2 rounded text-white ${isAddedToCart ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`}
          disabled={isAddedToCart}
        >
          {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
