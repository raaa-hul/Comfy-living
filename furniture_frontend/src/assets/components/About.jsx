import React from 'react';

function About() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10" >
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-4">About Us</h1>
      <p className="text-gray-700 text-lg mb-4">
        At Comfy Living, we believe that furniture should be both stylish and comfortable.
        Our mission is to provide quality pieces that enhance your living space.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Our Story</h2>
      <p className="text-gray-700 mb-4">
        Founded in 2024, we started with a simple idea: to create a furniture line
        that combines elegance with comfort.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Our Values</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li className="mb-2">Quality Craftsmanship</li>
        <li className="mb-2">Customer Satisfaction</li>
        <li className="mb-2">Sustainable Practices</li>
      </ul>
    </div>
  );
}

export default About;
