import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import axios from 'axios'; // Import axios for making API requests

const HomeProduct = () => {
  const [products, setProducts] = useState([]); // State to store products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/furniture/?category=home"); // Fetch home products
        setProducts(response.data); // Set the products state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Run once when the component mounts

  return (
    <div className="products-bg mt-5 mb-5">
      <h1 className="text-5xl font-bold text-[#ec8c1d] mb-2 text-center">
        Our Home Products
      </h1>
      <p className="text-xl text-white text-opacity-80 max-w-3xl mx-auto text-center mb-6">
        Discover our range of comfortable and stylish home furniture.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg" // Added hover effects
          >
            <div className="">
              {/* Image with object-cover to maintain aspect ratio */}
              <img
                src={product.image_url} // Use image_url from API response
                className="w-full h-full" // Set a fixed height for uniformity
                alt={product.name} // Use product name for alt text
              />
            </div>
            <div className="p-4">
              <h5 className="text-lg font-semibold">{product.name}</h5> {/* Use product name */}
              <p className="text-gray-600">{product.description}</p> {/* Use product description */}
              <div className="flex justify-between items-center mt-4">
                <NavLink
                  to={`/product-detail/${product.id}`} // Link to product detail page
                  className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
                >
                  View Details
                </NavLink>
                <span className="font-bold text-lg">{`Rs. ${product.price}`}</span> {/* Use product price */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeProduct;
