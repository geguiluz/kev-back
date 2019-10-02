const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors());

//Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/devices', require('./routes/devices'));

app.use('/api/telematics', require('./routes/telematics'));

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
