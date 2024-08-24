import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS
import './VenueForm.css'; // Assuming you have this for styling

const VenueForm = ({ fetchVenues }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    country: '',
    category: '',
    description: '',
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/venues', formData);
      toast.success('Venue added successfully');
      fetchVenues(); // Fetch the updated list of venues
    } catch (error) {
      toast.error('Error adding venue');
      console.error('Error adding venue:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="venue-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          required
        />

        <button type="submit">Add Venue</button>
      </form>
      <ToastContainer /> {/* This is required to display toasts */}
    </>
  );
};

export default VenueForm;
