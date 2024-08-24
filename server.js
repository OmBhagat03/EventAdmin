const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// MongoDB connection string
const mongoURI = 'mongodb://root:root@localhost:27017/'; 

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define Event schema
const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  status: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  venue: { type: String, required: true },
  doorTime: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Event = mongoose.model('Event', EventSchema);

// Route to add a new event
app.post('/api/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully!' });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(400).json({ error: 'Error adding event.' });
  }
});

// Route to get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events.' });
  }
});

// Route to get a single event by ID
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found.' });
    }
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Error fetching event.' });
  }
});

// Route to delete an event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (event) {
      res.status(200).json({ message: 'Event deleted successfully!' });
    } else {
      res.status(404).json({ error: 'Event not found.' });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(400).json({ error: 'Error deleting event.' });
  }
});

// Route to update an event
app.put('/api/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedEvent) {
      res.status(200).json({ message: 'Event updated successfully!' });
    } else {
      res.status(404).json({ error: 'Event not found.' });
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ error: 'Error updating event.' });
  }
});

// Define Speaker schema
const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
});

const Speaker = mongoose.model('Speaker', SpeakerSchema);

// Define Venue schema
const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

const Venue = mongoose.model('Venue', VenueSchema);

// Speaker Routes
app.post('/api/speakers', async (req, res) => {
  try {
    const newSpeaker = new Speaker(req.body);
    await newSpeaker.save();
    res.status(201).json({ message: 'Speaker added successfully!' });
  } catch (error) {
    console.error('Error adding speaker:', error);
    res.status(400).json({ error: 'Error adding speaker.' });
  }
});

app.get('/api/speakers', async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.status(200).json(speakers);
  } catch (error) {
    console.error('Error fetching speakers:', error);
    res.status(500).json({ error: 'Error fetching speakers.' });
  }
});

// Venue Routes
app.post('/api/venues', async (req, res) => {
  try {
    const newVenue = new Venue(req.body);
    await newVenue.save();
    res.status(201).json({ message: 'Venue added successfully!' });
  } catch (error) {
    console.error('Error adding venue:', error);
    res.status(400).json({ error: 'Error adding venue.' });
  }
});

app.get('/api/venues', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ error: 'Error fetching venues.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
