// VenueList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VenueList.css';
import { Toaster, toast } from 'react-hot-toast';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/venues');
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
      toast.error('Error fetching venues.');
    }
  };

  const handleAddVenueClick = () => {
    navigate('/add-venue');
  };

  const handleEditClick = (id) => {
    navigate(`/edit-venue/${id}`); // Navigate to the EditVenue page with the venue ID
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/venues/${id}`);
      setVenues(venues.filter((venue) => venue._id !== id)); // Remove the deleted venue from the state
      toast.success('Venue deleted successfully!');
    } catch (error) {
      console.error('Error deleting venue:', error);
      toast.error('Error deleting venue.');
    }
  };

  return (
    <div className="venue-list-container">
      {/*<Toaster position="top-right" reverseOrder={false} />*/}
      <h2 className="venue-list-title">Venues</h2>
      <button onClick={handleAddVenueClick} className="add-venue-btn">
        Add Venue
      </button>
      <div className="venue-cards-grid">
        {venues.map((venue) => (
          <div key={venue._id} className="venue-card">
            <img src={venue.image} alt={venue.name} className="venue-image" />
            <div className="venue-details">
              <div className="venue-tags">
                <span className="venue-tag country-tag">{venue.country}</span>
                <span className="venue-tag category-tag">{venue.category}</span>
              </div>
              <h3 className="venue-name">{venue.name}</h3>
              <p className="venue-description">{venue.description}</p>
            </div>
            <div className="venue-card-footer">
              <button onClick={() => handleEditClick(venue._id)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteClick(venue._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;
