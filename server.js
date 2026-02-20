require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// AUTH ROUTES
const authRoutes = require("./routes/auth.js");

// ORDER ROUTES
const orderRoutes = require("./routes/orderRoutes.js");

// CONTACT & MEMBERSHIP ROUTES
const contactMembershipRoutes = require("./routes/contactMembership.js");

// AUTH MIDDLEWARE
const protect = require("./middleware/authMiddleware.js");

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://vercel-frontend-silk-alpha.vercel.app",
].filter(Boolean);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Contact & Membership endpoints
// The router handles /contact and /membership internally
app.use("/api/forms", contactMembershipRoutes);

// TEST ROUTE
app.get("/", (req, res) => res.send("Backend Running"));

// PROTECTED TEST ROUTE
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    userId: req.userId,
  });
});

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

