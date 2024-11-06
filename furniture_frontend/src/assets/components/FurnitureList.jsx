import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import Axios

const FurnitureList = () => {
    const [furniture, setFurniture] = useState([]);  // State to store furniture data
    const [newFurniture, setNewFurniture] = useState({ name: '', description: '', price: '', image_url: '' });  // State for new furniture item

    useEffect(() => {
        // Fetch furniture data from the API using Axios
        axios.get("http://localhost:8000/api/v1/furniture/")
            .then(response => {
                setFurniture(response.data);  // Update state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);  // Log any errors
            });
    }, []);  // Empty array means this runs once when the component mounts

    // Function to handle changes in the form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFurniture({ ...newFurniture, [name]: value });  // Update state for new furniture item
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        // Send POST request to add new furniture using Axios
        axios.post("http://localhost:8000/api/v1/furniture/", newFurniture)
            .then(response => {
                console.log("New furniture added:", response.data);  // Log the newly added furniture
                setFurniture([...furniture, response.data]);  // Update the furniture list with the new item
                setNewFurniture({ name: '', description: '', price: '', image_url: '' });  // Reset form fields
            })
            .catch(error => {
                console.error('Error adding furniture:', error);  // Log any errors
            });
    };

    return (
        <div>
            <h1>Furniture List</h1>
            <ul>
                {furniture.map(item => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <img src={item.image_url} alt={item.name} style={{ width: '100px' }} />
                    </li>
                ))}
            </ul>

            <h2>Add New Furniture</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newFurniture.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newFurniture.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newFurniture.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="image_url"
                    placeholder="Image URL"
                    value={newFurniture.image_url}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Furniture</button>
            </form>
        </div>
    );
};

export default FurnitureList;
