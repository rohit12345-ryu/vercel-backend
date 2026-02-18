const express = require("express");
const Membership = require("../models/Membership");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * POST /api/membership
 * Create a membership booking (optional auth)
 */
router.post("/", async (req, res) => {
  try {
    const membership = new Membership({
      user: req.userId || undefined,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      plan: req.body.plan,
      startDate: req.body.startDate,
      notes: req.body.notes,
    });

    const saved = await membership.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Membership booking failed" });
  }
});

module.exports = router;
