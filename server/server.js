// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Load env vars
// dotenv.config(); // This will look for a .env file in the root of the server directory

// // Connect to database
// connectDB();

// const app = express();

// // Body parser
// app.use(express.json());

// // Enable CORS with specific options
// // app.use(cors({
// //   origin: [
// //     'https://rashtriya-kishan-manch.vercel.app', 
// //     'https://api.rashtriyakisanmanch.com', 
// //     'http://localhost:4028', 
// //     'http://localhost:3000', 
// //     'https://kishan-andolan.vercel.app',
// //     'https://kisan-andolan.vercel.app',
// //     'https://kisanrajmanch.vercel.app'
// //   ],
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// //   credentials: true
// // }));

// const allowedOrigins = [
//   'https://rashtriya-kishan-manch.vercel.app', 
//   'https://api.rashtriyakisanmanch.com', 
//   'http://localhost:4028', 
//   'http://localhost:3000', 
//   'https://kishan-andolan.vercel.app',
//   'https://kisan-andolan.vercel.app',
//   'https://kisanrajmanch.vercel.app'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// // Add a specific route to handle the log-error endpoint from the external domain
// app.options('/log-error', cors());
// app.post('/log-error', (req, res) => {
//   console.log('External error logging received');
//   res.status(200).json({ success: true });
// });

// const path = require('path'); // Required for serving static files

// // Import route files
// const authRoutes = require('./routes/authRoutes');
// const mediaRoutes = require('./routes/mediaRoutes');
// const memberRoutes = require('./routes/memberRoutes');
// const programRoutes = require('./routes/programRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const teamRoutes = require('./routes/teamRoutes');
// const andolanRoutes = require('./routes/andolanRoutes');
// const informationRoutes = require('./routes/informationRoutes');
// const visionRoutes = require('./routes/visionRoutes');
// const pdfRoutes = require('./routes/pdfRoutes');
// const razorpayRoutes = require('./routes/razorpayRoutes');
// const timelineRoutes = require('./routes/timelineRoutes');
// const aboutRoutes = require('./routes/aboutRoutes');
// const bannerRoutes = require('./routes/bannerRoutes');
// const partnerInquiryRoutes = require('./routes/partnerInquiryRoutes');

// // Import middleware
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// // Serve static files from the 'public' directory
// // This will make files in 'public/uploads' accessible via /uploads/filename.ext
// app.use(express.static(path.join(__dirname, 'public')));

// // Serve uploaded files from the tmp/uploads directory
// app.use('/tmp/uploads', express.static(path.join(__dirname, 'tmp/uploads')));

// // Define a simple route for testing
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Mount routers
// app.use('/api/auth', authRoutes);
// app.use('/api/media', mediaRoutes);
// app.use('/api/members', memberRoutes);
// app.use('/api/programs', programRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/team', teamRoutes);
// app.use('/api/andolan', andolanRoutes);
// app.use('/api/information', informationRoutes);
// app.use('/api/vision', visionRoutes);
// app.use('/api/pdf', pdfRoutes);
// app.use('/api/donate', razorpayRoutes);
// app.use('/api/timeline', timelineRoutes);
// app.use('/api/about', aboutRoutes);
// app.use('/api/banner', bannerRoutes);
// app.use('/api/partnership-inquiries', partnerInquiryRoutes);
// // app.use('/api/admin', require('./routes/adminRoutes')); // Placeholder for specific admin panel routes if needed beyond CRUD

// app.get('/getKey', (req, res) => {
//   res.json(process.env.RAZORPAY_KEY_ID)
// })

// // Custom error handling middleware
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// ✅ Allowed Origins
const allowedOrigins = [
  'https://rashtriya-kishan-manch.vercel.app', 
  'https://api.rashtriyakisanmanch.com', 
  'http://localhost:4028', 
  'http://localhost:3000', 
  'https://kishan-andolan.vercel.app',
  'https://kisan-andolan.vercel.app',
  'https://kisanrajmanch.vercel.app'
];

// ✅ CORS Setup
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (e.g. mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// ✅ Apply CORS before routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests globally

// ✅ Handle external log-error route (optional)
app.options('/log-error', cors());
app.post('/log-error', (req, res) => {
  console.log('External error logging received');
  res.status(200).json({ success: true });
});

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tmp/uploads', express.static(path.join(__dirname, 'tmp/uploads')));

// ✅ Import route files
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const memberRoutes = require('./routes/memberRoutes');
const programRoutes = require('./routes/programRoutes');
const projectRoutes = require('./routes/projectRoutes');
const teamRoutes = require('./routes/teamRoutes');
const andolanRoutes = require('./routes/andolanRoutes');
const informationRoutes = require('./routes/informationRoutes');
const visionRoutes = require('./routes/visionRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const razorpayRoutes = require('./routes/razorpayRoutes');
const timelineRoutes = require('./routes/timelineRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const partnerInquiryRoutes = require('./routes/partnerInquiryRoutes');

// ✅ Middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// ✅ Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/andolan', andolanRoutes);
app.use('/api/information', informationRoutes);
app.use('/api/vision', visionRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/donate', razorpayRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/partnership-inquiries', partnerInquiryRoutes);

// ✅ Razorpay public key endpoint
app.get('/getKey', (req, res) => {
  res.json(process.env.RAZORPAY_KEY_ID);
});

// ✅ Error handling middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Export for Vercel (do not use app.listen)
module.exports = app;

// ✅ Only run server locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}
