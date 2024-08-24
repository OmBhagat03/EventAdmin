import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SpeakerList.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
    }
  };

  const handleAddSpeakerClick = () => {
    navigate('/add-speaker');
  };

  return (
    <div className="speaker-list">
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
              {/* Assuming you have social links in the data */}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakerList;
