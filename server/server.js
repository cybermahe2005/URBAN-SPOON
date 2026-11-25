const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const Admin = require('./models/Admin');
const TableInquiry = require('./models/TableInquiry');

// Route imports
const authRoutes = require('./routes/authRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamic CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Urban Spoon REST API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Ensure default admin account exists automatically
const ensureDefaultAdminAndData = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('[Auto-Init] No admin detected. Creating default admin account...');
      await Admin.create({
        name: 'Chef Alexandre Laurent',
        email: 'admin@urbanspoon.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('[Auto-Init] Default admin created: admin@urbanspoon.com / admin123');
    }

    const inquiryCount = await TableInquiry.countDocuments();
    if (inquiryCount === 0) {
      console.log('[Auto-Init] Seeding starter inquiries for instant admin verification...');
      const now = new Date();
      await TableInquiry.insertMany([
        {
          customerName: 'Eleanor Vance',
          phoneNumber: '+1 (555) 234-5678',
          bookingDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
          numberOfGuests: 2,
          specialRequests: 'Window table preferred for anniversary celebration with candle setup.',
          status: 'Pending',
        },
        {
          customerName: 'Marcus Sterling',
          phoneNumber: '+1 (555) 876-5432',
          bookingDate: new Date(now.getTime() + 48 * 60 * 60 * 1000),
          numberOfGuests: 4,
          specialRequests: 'One guest is strictly gluten-free and dairy allergic.',
          status: 'Confirmed',
        },
        {
          customerName: 'Sophia Rodriguez',
          phoneNumber: '+1 (555) 345-6789',
          bookingDate: new Date(now.getTime() + 72 * 60 * 60 * 1000),
          numberOfGuests: 6,
          specialRequests: 'Executive business dinner. Quiet corner booth requested.',
          status: 'Confirmed',
        },
        {
          customerName: 'James Chen',
          phoneNumber: '+1 (555) 901-2345',
          bookingDate: new Date(now.getTime() + 12 * 60 * 60 * 1000),
          numberOfGuests: 2,
          specialRequests: 'Celebrating a birthday, would appreciate dessert sparkler.',
          status: 'Pending',
        },
      ]);
      console.log('[Auto-Init] Initial table inquiries seeded.');
    }
  } catch (err) {
    console.warn('[Auto-Init] Notice during auto-initialization:', err.message);
  }
};

let serverInstance;

const startServer = async () => {
  await connectDB();
  await ensureDefaultAdminAndData();
  serverInstance = app.listen(PORT, () => {
    console.log(`[Urban Spoon Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
