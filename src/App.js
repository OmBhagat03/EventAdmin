import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin/AdminLogin';
import EventList from './components/Event/EventList';
import EventForm from './components/Event/EventForm';
import SpeakerList from './components/Speaker/SpeakerList';
import SpeakerForm from './components/Speaker/SpeakerForm';
import VenueList from './components/Venue/VenueList';
import VenueForm from './components/Venue/VenueForm';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/events" element={<EventList />} /> {/* Event List Route */}
          <Route path="/add-event" element={<EventForm />} /> {/* Event Form Route */}
          <Route path="/speakers" element={<SpeakerList />} /> {/* Speaker List Route */}
          <Route path="/add-speaker" element={<SpeakerForm />} /> {/* Speaker Form Route */}
          <Route path="/venues" element={<VenueList />} /> {/* Venue List Route */}
          <Route path="/add-venue" element={<VenueForm />} /> {/* Venue Form Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
