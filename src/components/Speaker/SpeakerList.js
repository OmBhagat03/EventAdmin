import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SpeakerList.css';

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
    navigate(`/edit-speaker/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/speakers/${id}`);
      setSpeakers(speakers.filter((speaker) => speaker._id !== id));
      toast.success('Speaker deleted successfully!');
    } catch (error) {
      console.error('Error deleting speaker:', error);
      toast.error('Error deleting speaker.');
    }
  };

  return (
    <div className="container my-4">
      
      <h2 className="mb-4">Speakers</h2>
      <button onClick={handleAddSpeakerClick} className="btn btn-primary mb-4">
        Add Speaker
      </button>
      <div className="row">
        {speakers.map((speaker) => (
          <div key={speaker._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={speaker.photo} alt={speaker.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{speaker.name}</h5>
                <p className="card-text text-muted">{speaker.role}</p>
                <p className="card-text">{speaker.description}</p>
                <div className="social-icons">
                  {speaker.facebook && (
                    <a href={speaker.facebook} target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="fab fa-facebook"></i>
                    </a>
                  )}
                  {speaker.twitter && (
                    <a href={speaker.twitter} target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {speaker.linkedin && (
                    <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                  {speaker.instagram && (
                    <a href={speaker.instagram} target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button onClick={() => handleEditClick(speaker._id)} className="btn btn-success btn-sm">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(speaker._id)} className="btn btn-danger btn-sm">
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

export default SpeakerList;
