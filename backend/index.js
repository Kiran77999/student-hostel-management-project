const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/supplysetu')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Marketplace routes
app.use('/api/market', require('./routes/marketRoutes'));

// Lost and Found routes
app.use('/api/lost', require('./routes/lostRoutes'));

// Admin routes
app.use('/api/admin', require('./routes/adminRoutes'));

// Student Elective routes
app.use('/api/electives', require('./routes/electiveRoutes'));

app.get('/', (req, res) => {
    res.send('Student Management System API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
