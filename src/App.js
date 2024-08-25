import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './components/AdminLogin/AdminLogin';
import EventList from './components/Event/EventList';
import EventForm from './components/Event/EventForm';
import EditEvent from './components/Event/EditEvent';
import SpeakerList from './components/Speaker/SpeakerList';
import SpeakerForm from './components/Speaker/SpeakerForm';
import EditSpeaker from './components/Speaker/EditSpeaker'; // Import EditSpeaker component
import VenueList from './components/Venue/VenueList';
import VenueForm from './components/Venue/VenueForm';
import EditVenue from './components/Venue/EditVenue'; // Import EditVenue component
import Header from './components/Header/Header';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <ToastContainer />
        <Toaster />
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/add-event" element={<EventForm />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/speakers" element={<SpeakerList />} />
          <Route path="/add-speaker" element={<SpeakerForm />} />
          <Route path="/edit-speaker/:id" element={<EditSpeaker />} /> {/* Add EditSpeaker route */}
          <Route path="/venues" element={<VenueList />} />
          <Route path="/add-venue" element={<VenueForm />} />
          <Route path="/edit-venue/:id" element={<EditVenue />} /> {/* Add EditVenue route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
