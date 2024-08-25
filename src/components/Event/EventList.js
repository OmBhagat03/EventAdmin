import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster, toast } from 'react-hot-toast';
import './EventList.css';  // Import the CSS file for styling

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
    navigate('/add-event');
  };

  const handleEditClick = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
      toast.success('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event.');
    }
  };

  return (
    <div className="container my-4">
      
      <h2 className="mb-4">Events</h2>
      <button onClick={handleAddEventClick} className="btn btn-primary mb-4">
        Add Event
      </button>
      <div className="row">
        {events.map((event) => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="position-relative">
                <img src={event.image} className="card-img-top" alt={event.name} />
                <div className={`status-badge ${event.status.toLowerCase()}`}>
                  {event.status}
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text"><strong>Category:</strong> {event.category}</p>
                <p className="card-text"><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                <p className="card-text"><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
                <p className="card-text"><strong>Location:</strong> {event.location}</p>
                <p className="card-text"><strong>Organizer:</strong> {event.organizer}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button onClick={() => handleEditClick(event._id)} className="btn btn-success btn-sm">Edit</button>
                <button onClick={() => handleDeleteClick(event._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
