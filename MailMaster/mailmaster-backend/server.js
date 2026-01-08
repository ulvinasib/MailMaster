require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const emailRoutes = require('./routes/emails');
const aiRoutes = require('./routes/ai');
const templateRoutes = require('./routes/templates');


require('dotenv').config()

// Import routes
const authRoutes = require('./routes/auth');

const app = express();

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'MailMaster AI Backend'
  });
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);

//Protected routes
app.use('/emails', emailRoutes); 
app.use('/ai', aiRoutes);
app.use('/api/templates', templateRoutes);





// 404 handler
app.use( (req, res,next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 MailMaster Backend running on http://localhost:${PORT}`);
  console.log(`📧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

module.exports = app;