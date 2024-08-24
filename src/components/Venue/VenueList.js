import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VenueList.css';

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
    }
  };

  const handleAddVenueClick = () => {
    navigate('/add-venue');
  };

  return (
    <div className="venue-list-container">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;
