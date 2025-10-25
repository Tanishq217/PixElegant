// backend/index.js
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

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = new Set([
  "http://localhost:5173",       // Frontend dev
  "http://localhost:5175",       // Admin dev
  "https://adminpix.netlify.app",               // Your main admin site 
  "https://pixelegant.netlify.app",              // Your main frontend site
  "https://68fca34f2f47e961a6604873--adminpix.netlify.app", // Deploy preview
]);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin OR from allowed origins
    if (!origin || allowedOrigins.has(origin)) {
      console.log(`CORS: Allowed origin: ${origin || 'N/A'}`); 
      callback(null, true);
    } else {
      console.error(`CORS: Blocked origin: ${origin}`); 
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly for all routes
app.options('*', cors(corsOptions)); // Handles OPTIONS requests


// --- THIS IS THE FIX ---
// Serve static uploads
// Changed 'public/uploads' to just 'public' to match your multer config
app.use('/uploads', express.static(path.join(__dirname, 'public')));
// --- END OF FIX ---


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Connect to MongoDB & Start Server
const PORT = parseInt(process.env.PORT || '4000', 10);
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