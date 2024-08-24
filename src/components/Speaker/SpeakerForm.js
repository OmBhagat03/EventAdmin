import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is added for toast styles
import './SpeakerForm.css'; // Create this file for styling if needed

const SpeakerForm = ({ fetchSpeakers }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    role: '',
    description: '',
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/speakers', formData);
    
    // Assuming a successful post returns a status code in the 2xx range
    if (response.status >= 200 && response.status < 300) {
      toast.success('Speaker added successfully');
      fetchSpeakers(); // Fetch the updated list of speakers
    } else {
      toast.error('Failed to add speaker. Please try again.');
    }
  } catch (error) {
    toast.error('Error adding speaker');
    console.error('Error adding speaker:', error);
  }
};


  return (
    <>
      <form onSubmit={handleSubmit} className="speaker-form">
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

        <button type="submit">Add Speaker</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default SpeakerForm;
