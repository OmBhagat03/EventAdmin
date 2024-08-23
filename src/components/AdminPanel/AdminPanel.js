import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      toast.error('Error fetching events');
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEventClick = () => {
    navigate('/add-event'); // Navigate to the Add Event page
  };

  const handleEditClick = (eventId) => {
    navigate(`/edit-event/${eventId}`); // Navigate to the Edit Event page
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      toast.error('Error deleting event');
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="admin-panel-container">
      <header className="admin-header">
        <nav>
          <ul>
            <li onClick={() => navigate('/speakers')}>Speakers</li>
            <li onClick={() => navigate('/venues')}>Venues</li>
            <li onClick={() => navigate('/admin-panel')}>Events</li>
          </ul>
        </nav>
        <button onClick={handleAddEventClick} className="add-event-btn">
          Add Event
        </button>
      </header>

      <h2>All Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            {event.image ? (
              <img src={event.image} alt={event.name} className="event-image" />
            ) : (
              <div className="event-image-placeholder">No Image Available</div>
            )}
            <div className="event-details">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
              <div className="event-actions">
                <button onClick={() => handleEditClick(event._id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteClick(event._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPanel;
