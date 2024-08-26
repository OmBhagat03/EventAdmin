import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import './EventForm.css';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    category: '',
    location: '',
    organizer: '',
    status: '',
    startDate: '',
    endDate: '',
    venue: '',
    doorTime: '',
    address: '',
    phone: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/events', formData);
      toast.success('Event added successfully!'); // Show success notification
      navigate('/events'); // Navigate back to the EventList page
    } catch (error) {
      toast.error('Error adding event. Please try again.'); // Show error notification
      console.error('Error adding event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <Toaster position="top-right" reverseOrder={false} /> {/* Toaster for showing notifications */}
      <h2>Add Event</h2>
      
      {/* Form fields */}
      <label htmlFor="name">Event Name</label>
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

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
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

      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="organizer">Organizer</label>
      <input
        type="text"
        id="organizer"
        name="organizer"
        value={formData.organizer}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="status">Status</label>
      <input
        type="text"
        id="status"
        name="status"
        value={formData.status}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={formData.startDate}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={formData.endDate}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="venue">Venue</label>
      <input
        type="text"
        id="venue"
        name="venue"
        value={formData.venue}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="doorTime">Door Time</label>
      <input
        type="time"
        id="doorTime"
        name="doorTime"
        value={formData.doorTime}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="phone">Phone Number</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleFormChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleFormChange}
        required
      />

      <button type="submit" className="submit-btn">Add Event</button>
    </form>
  );
};

export default EventForm;
