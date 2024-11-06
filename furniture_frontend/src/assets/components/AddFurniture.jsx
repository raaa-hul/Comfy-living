import React, { useState } from 'react';
import axios from 'axios';

const AddFurniture = () => {
  const [newFurniture, setNewFurniture] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'home',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFurniture({ ...newFurniture, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    axios.post("http://localhost:8000/api/v1/furniture/", newFurniture)
      .then(response => {
        console.log("New furniture added:", response.data);
        // Reset the form after successful submission
        setNewFurniture({ name: '', description: '', price: '', image_url: '', category: 'home' });
      })
      .catch(error => {
        console.error('Error adding furniture:', error);
      });
  };

  return (
    <div className="mb-3 max-w-lg mt-3 mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-4">Add Furniture</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder=" Furniture Name"
            value={newFurniture.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            placeholder=" Description"
            value={newFurniture.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            placeholder=" Price"
            value={newFurniture.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="image_url"
            placeholder=" Image URL"
            value={newFurniture.image_url}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200"
          />
        </div>

        {/* Category selection */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={newFurniture.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200"
          >
            <option value="home">&nbsp;Home Products</option>
            <option value="office">&nbsp;Office Products</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
        >
          Add Furniture
        </button>
      </form>
    </div>
  );
};

export default AddFurniture;
