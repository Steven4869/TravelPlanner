const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const flightRoutes = require('./routes/flightRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes')
const errorHandler = require('./utils/errorHandler');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());



// API routes
app.use('/api/accommodation', accommodationRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/itineraries', itineraryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  });

// Start the server
const dbURI = 'mongodb://127.0.0.1:27017/travelplanner';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
      // Start the server after successful connection
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
