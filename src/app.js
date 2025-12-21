const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/ticketRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const timeTrackingRoutes = require('./routes/timeTrackingRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/time-logs', timeTrackingRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.get('/', (req, res) => res.json({ status: 'online', engine: 'Nebula Neural Engine' }));
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Routes loaded: /api/tickets, /api/projects, /api/users, /api/activities, /api/time-logs, /api/suggestions, /api/ai');
});
