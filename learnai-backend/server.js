const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

// Global Middleware
app.use(cors());
app.use(bodyParser.json());

//For Checking
app.get('/', (req, res) => {
  res.send('Welcome to the LearnAI API');
});


// Register Routes
app.use('/api', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
