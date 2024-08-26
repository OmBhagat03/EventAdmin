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
      const response = await axios.get('http://localhost:5001/api/venues');
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
    navigate(`/edit-venue/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/venues/${id}`);
      setVenues(venues.filter((venue) => venue._id !== id));
      toast.success('Venue deleted successfully!');
    } catch (error) {
      console.error('Error deleting venue:', error);
      toast.error('Error deleting venue.');
    }
  };

  return (
    <div className="container my-4">
      
      <h2 className="mb-4">Venues</h2>
      <button onClick={handleAddVenueClick} className="btn btn-primary mb-4">
        Add Venue
      </button>
      <div className="row">
        {venues.map((venue) => (
          <div key={venue._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={venue.image} alt={venue.name} className="card-img-top venue-image" />
              <div className="card-body">
                <div className="mb-2">
                  <span className="badge bg-secondary me-2">{venue.country}</span>
                  <span className="badge bg-info">{venue.category}</span>
                </div>
                <h5 className="card-title">{venue.name}</h5>
                <p className="card-text">{venue.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button onClick={() => handleEditClick(venue._id)} className="btn btn-success btn-sm">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(venue._id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;
