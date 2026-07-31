require('dotenv').config();

const buffer = require('buffer');
if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer;
}

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const authRoutes = require('./routes/auth');  // or however you’ve named it
const resumeRoutes = require('./routes/api');  // or however you’ve named it

const app = express();

// 1) Enable CORS for your React origin
app.use(cors({
//   origin: 'http://localhost:3000',  // React dev server
//   credentials: true,                // if you need cookies/auth headers
}));

// 2) Parse JSON
app.use(express.json());

// 3) Mount your auth (and other) routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// 4) Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// 5) Optional root endpoint
app.get('/', (req, res) => res.send('Server is running ✅'));

// 6) Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
