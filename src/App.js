import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminPanel from './components/AdminPanel/AdminPanel';
import AddEvent from './components/AdminPanel/AddEvent';  // New component for adding an event
import EditEvent from './components/AdminPanel/EditEvent';  // New component for editing an event
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/add-event" element={<AddEvent />} />  {/* Add Event route */}
          <Route path="/edit-event/:id" element={<EditEvent />} />  {/* Edit Event route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
