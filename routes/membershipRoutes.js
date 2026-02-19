import express from "express";
import Membership from "../models/Membership.js";

const router = express.Router();

// POST /api/membership - Submit membership request
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, plan, startDate, notes } = req.body;

    // Validate required fields
    if (!name || !email || !plan) {
      return res.status(400).json({ 
        message: "Name, email, and plan are required" 
      });
    }

    // Create new membership request
    const membership = new Membership({
      name,
      email,
      phone,
      address,
      plan,
      startDate,
      notes,
      status: "pending",
    });

    await membership.save();

    res.status(201).json({ 
      message: "Membership request submitted successfully",
      membership 
    });
  } catch (error) {
    console.error("Membership submission error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
});

// GET /api/membership - Get all membership requests (for admin)
router.get("/", async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (error) {
    console.error("Error fetching memberships:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
