const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

const scheduleTimer = require('./controller/scheduleTimer');

const app = express();

app.use(cors());

//Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/devices', require('./routes/devices'));
app.use('/api/presets', require('./routes/presets'));

app.use('/api/telematics', require('./routes/telematics'));

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// The following function sets the timer for the Home Alone feature every 7
// seconds. This feature can be turned off by setting the first parameter to
// false
console.log('Env: ', process.env.TIMER_ACTIVE);
process.env.TIMER_ACTIVE === '0' ? (runTimer = false) : (runTimer = true);
scheduleTimer(runTimer, 7);
