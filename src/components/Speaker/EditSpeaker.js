import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './EditSpeaker.css'; // Assuming you have a CSS file for styling

const EditSpeaker = () => {
  const { id } = useParams();  // Get the speaker ID from the URL parameters
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    role: '',
    description: '',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch the speaker data when the component loads
  useEffect(() => {
    const fetchSpeakerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/speakers/${id}`);
        const speakerData = response.data;

        setFormData(speakerData);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching speaker data');
        console.error('Error fetching speaker data:', error);
        setLoading(false);
      }
    };

    fetchSpeakerData();
  }, [id]);

  // Handle form field changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/speakers/${id}`, formData);
      toast.success('Speaker Updated Successfully'); // Show success notification
      navigate('/speakers'); // Redirect to the speakers page
    } catch (error) {
      toast.error('Error updating speaker');
      console.error('Error updating speaker:', error);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate('/speakers'); // Navigate to SpeakerList (speakers page)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-panel-container">
      <Toaster position="top-right" reverseOrder={false} /> {/* Toaster for notifications */}
      <h2>Edit Speaker</h2>
      <form onSubmit={handleSubmit} className="admin-panel-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="photo">Photo URL</label>
        <input
          type="text"
          id="photo"
          name="photo"
          value={formData.photo}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          required
        />

        <button type="submit" className="submit-btn">Update Speaker</button>
        <button onClick={handleBackClick} type="button" className="back-button">← Back to Admin Panel</button>
      </form>
    </div>
  );
};

export default EditSpeaker;
