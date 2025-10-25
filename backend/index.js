import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---------------------
// Middleware
// ---------------------
app.use(express.json());
app.use(cookieParser());

// ---------------------
// CORS configuration
// ---------------------
const allowedOrigins = [
  "http://localhost:5173",                 // Frontend dev
  "http://localhost:5175",                 // Admin dev
  "https://pixelegant.netlify.app",       // Frontend prod
  "https://pixelegant-admin.netlify.app", // Old admin prod
  "https://adminpix.netlify.app"          // New admin prod
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ---------------------
// Serve static uploads
// ---------------------
app.use('/uploads', express.static(path.join(__dirname, 'public')));

// ---------------------
// API Routes
// ---------------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// ---------------------
// Connect to MongoDB & Start Server
// ---------------------
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!MONGO_URI) {
  console.error("Error: MONGODB_URI or MONGODB_URL is not set in environment variables");
  process.exit(1);
}

connectDb(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
