import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './EditEvent.css'; // Ensure you import the CSS file

const EditEvent = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        const eventData = response.data;

        setFormData({
          ...eventData,
          startDate: eventData.startDate ? eventData.startDate.split('T')[0] : '',
          endDate: eventData.endDate ? eventData.endDate.split('T')[0] : '',
        });

        setLoading(false);
      } catch (error) {
        toast.error('Error fetching event data');
        console.error('Error fetching event data:', error);
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, formData);
      toast.success('Event Updated Successfully');
      navigate('/events');
    } catch (error) {
      toast.error('Error updating event');
      console.error('Error updating event:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/events');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-form-container">
      
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
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

        <button type="submit" className="submit-btn">Update Event</button>
        <button onClick={handleBackClick} type="button" className="back-button">← Back to Admin Panel</button>
      </form>
    </div>
  );
};

export default EditEvent;
