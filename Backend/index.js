import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import libraryRoute from "./route/library.route.js";

// Load environment variables
dotenv.config();

const app = express();

// Trust proxy for production (needed on Render)
app.set("trust proxy", 1);

// ✅ Allowed frontend origins
const allowedOrigins = [
  "https://booken-five.vercel.app", // Vercel frontend
  "http://localhost:5173",          // Local dev
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/library", libraryRoute);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Booken API",
    version: "1.0.0",
  });
});

// MongoDB connection and server start
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

if (!URI) {
  console.error("❌ MONGODB_URI not set in .env");
  process.exit(1);
}

async function start() {
  try {
    await mongoose.connect(URI);
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();
