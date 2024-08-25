import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EventList.css';
import { Toaster, toast } from 'react-hot-toast';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      const updatedEvents = response.data.map(event => {
        const currentDate = new Date();
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);

        let status = 'Upcoming';
        if (currentDate >= startDate && currentDate <= endDate) {
          status = 'Showing';
        } else if (currentDate > endDate) {
          status = 'Expired';
        }

        return { ...event, status };
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Error fetching events.');
    }
  };

  const handleAddEventClick = () => {
    navigate('/add-event'); // Navigate to the EventForm page
  };

  const handleEditClick = (id) => {
    navigate(`/edit-event/${id}`); // Navigate to the EditEvent page with the event ID
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id)); // Remove the deleted event from the state
      toast.success('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event.');
    }
  };

  return (
    <div className="event-list-container">
      {/*<Toaster position="top-right" reverseOrder={false} />*/}
      <h2 className="event-list-title">Events</h2>
      <button onClick={handleAddEventClick} className="add-event-btn">
        Add Event
      </button>
      <div className="event-cards">
        {events.map((event) => (
          <div key={event._id} className={`event-card ${event.status.toLowerCase()}`}>
            <div className="event-card-header">
              <p className={`event-status ${event.status.toLowerCase()}`}>{event.status}</p>
              <img src={event.image} alt={event.name} className="event-image" />
            </div>
            <div className="event-card-body">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-details"><strong>Category:</strong> {event.category}</p>
              <p className="event-details"><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
              <p className="event-details"><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
              <p className="event-details"><strong>Location:</strong> {event.location}</p>
              <p className="event-details"><strong>Organizer:</strong> {event.organizer}</p>
            </div>
            <div className="event-card-footer">
              <button onClick={() => handleEditClick(event._id)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteClick(event._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
