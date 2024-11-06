import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Default payment method
  const navigate = useNavigate(); // Initialize navigate

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Proceed to checkout handler
  const handleCheckout = () => {
    // Clear cart items from localStorage
    localStorage.removeItem('cart');
    // Optionally, you can also clear cartItems from state
    setCartItems([]);
    // Navigate to the success page
    navigate('/success');
  };

  return (
    <div className="mb-3 max-w-lg mt-3 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-orange-500 text-center mb-4">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">Price: Rs. {item.price}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-12 text-center border border-gray-300 rounded"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-right">
            <p className="text-lg font-bold">Total: Rs. {calculateTotal()}</p>
            
            {/* Payment Method Selection */}
            <div className="mt-4">
              <label className="mr-2">Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border border-gray-300 rounded p-1"
              >
                <option value="cash">Cash on Delivery</option>
                
              </select>
            </div>

            <button
              onClick={handleCheckout} // Call handleCheckout on click
              className="bg-orange-500 text-white p-2 rounded mt-2 hover:bg-orange-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
