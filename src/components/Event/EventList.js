import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
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
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEventClick = () => {
    navigate('/add-event'); // Navigate to the EventForm page
  };

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Events</h2>
      <button onClick={handleAddEventClick} className="add-event-btn">
        Add Event
      </button>
      <div className="event-cards">
        {events.map((event) => (
          <div key={event._id} className={`event-card ${event.status}`}>
            <div className="event-card-header">
              <p className={`event-status ${event.status}`}>{event.status}</p>
              <img src={event.image} alt={event.name} className="event-image" />
            </div>
            <div className="event-card-body">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-details"><strong>Category:</strong> {event.category}</p>
              <p className="event-details"><strong>Date:</strong> {event.date}</p>
              <p className="event-details"><strong>Location:</strong> {event.location}</p>
              <p className="event-details"><strong>Organizer:</strong> {event.organizer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
