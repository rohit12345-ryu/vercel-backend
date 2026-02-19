require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// 🔐 AUTH ROUTES
const authRoutes = require("./routes/auth.js");

// 🆕 ORDER ROUTES (ADD THIS)
const orderRoutes = require("./routes/orderRoutes.js");
// CONTACT & MEMBERSHIP ROUTES
const contactRoutes = require("./routes/contactRoutes.js");
const membershipRoutes = require("./routes/membershipRoutes.js");

// 🔐 AUTH MIDDLEWARE
const protect = require("./middleware/authMiddleware.js");

const app = express();

app.use(cors({
  origin: "https://vercel-frontend-silk-alpha.vercel.app",
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

// 🆕 ORDER API (ADD THIS)
app.use("/api/orders", orderRoutes);
// Contact & membership endpoints
app.use("/api/contact", contactRoutes);
app.use("/api/membership", membershipRoutes);

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
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


module.exports = app;
