import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './EditVenue.css'; // Assuming you have a CSS file for styling

const EditVenue = () => {
  const { id } = useParams();  // Get the venue ID from the URL parameters
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    country: '',
    category: '',
    description: '',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch the venue data when the component loads
  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/venues/${id}`);
        const venueData = response.data;

        setFormData(venueData);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching venue data');
        console.error('Error fetching venue data:', error);
        setLoading(false);
      }
    };

    fetchVenueData();
  }, [id]);

  // Handle form field changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/venues/${id}`, formData);
      toast.success('Venue Updated Successfully'); // Show success notification
      navigate('/venues'); // Redirect to the venues page
    } catch (error) {
      toast.error('Error updating venue');
      console.error('Error updating venue:', error);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate('/venues'); // Navigate to VenueList (venues page)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-panel-container">
      <Toaster position="top-right" reverseOrder={false} /> {/* Toaster for notifications */}
      <h2>Edit Venue</h2>
      <form onSubmit={handleSubmit} className="admin-panel-form">
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

        <button type="submit" className="submit-btn">Update Venue</button>
        <button onClick={handleBackClick} type="button" className="back-button">← Back to Admin Panel</button>
      </form>
    </div>
  );
};

export default EditVenue;
