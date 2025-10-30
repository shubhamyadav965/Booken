import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import libraryRoute from "./route/library.route.js";

// Load environment variables as early as possible
dotenv.config();

const app = express();

// Security: Trust proxy for production (needed for Heroku, Railway, etc.)
app.set("trust proxy", 1);

// Allow multiple origins for development
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      process.env.NODE_ENV !== "production"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" }));

// Add request logging only in development
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
  });
}

// Prefer common env names and provide clear error if missing
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

if (!URI) {
  console.error("FATAL: MONGODB_URI not set in .env file");
  process.exit(1);
}

// Register routes BEFORE starting server
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/library", libraryRoute);

// Add health endpoint
app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

// Add root route for welcome message
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to Booken API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      books: "GET /book",
      users: "POST /user/signup, POST /user/login",
      library: "GET /library/:userId, POST /library",
    },
    documentation: "Visit /health to check server status",
  });
});

// Start server only after successful DB connection
async function start() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to mongoDB");

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`User signup: POST http://localhost:${PORT}/user/signup`);
      console.log(`User login: POST http://localhost:${PORT}/user/login`);
      console.log(`Books: http://localhost:${PORT}/book`);
    });

    // Add 404 handler after server is listening
    app.use((req, res) => {
      res.status(404).json({
        message: "Route not found",
        path: req.path,
        method: req.method,
        hint:
          req.method === "GET" &&
          (req.path === "/user/signup" || req.path === "/user/login")
            ? "This endpoint requires POST method, not GET. Check your frontend code."
            : "Invalid route",
        availableRoutes: {
          health: "GET /health",
          books:
            "GET /book, POST /book, GET /book/:id, PUT /book/:id, DELETE /book/:id",
          users: "POST /user/signup, POST /user/login",
        },
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

start();
