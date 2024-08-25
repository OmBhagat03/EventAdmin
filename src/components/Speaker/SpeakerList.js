// SpeakerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SpeakerList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Toaster, toast } from 'react-hot-toast';

const SpeakerList = () => {
  const [speakers, setSpeakers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/speakers');
      setSpeakers(response.data);
    } catch (error) {
      console.error('Error fetching speakers:', error);
      toast.error('Error fetching speakers.');
    }
  };

  const handleAddSpeakerClick = () => {
    navigate('/add-speaker');
  };

  const handleEditClick = (id) => {
    navigate(`/edit-speaker/${id}`); // Navigate to the EditSpeaker page with the speaker ID
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/speakers/${id}`);
      setSpeakers(speakers.filter((speaker) => speaker._id !== id)); // Remove the deleted speaker from the state
      toast.success('Speaker deleted successfully!');
    } catch (error) {
      console.error('Error deleting speaker:', error);
      toast.error('Error deleting speaker.');
    }
  };

  return (
    <div className="speaker-list">
      <Toaster position="top-right" reverseOrder={false} />
      <h2>Speakers</h2>
      <button onClick={handleAddSpeakerClick} className="add-speaker-btn">
        Add Speaker
      </button>
      <div className="speaker-grid">
        {speakers.map((speaker) => (
          <div key={speaker._id} className="speaker-card">
            <img src={speaker.photo} alt={speaker.name} className="speaker-photo" />
            <h3>{speaker.name}</h3>
            <p className="speaker-role">{speaker.role}</p>
            <p className="speaker-description">{speaker.description}</p>
            <div className="social-icons">
              <a href={speaker.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href={speaker.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={speaker.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="speaker-card-footer">
              <button onClick={() => handleEditClick(speaker._id)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteClick(speaker._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakerList;
