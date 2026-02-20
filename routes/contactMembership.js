const express = require("express");
const Membership = require("../models/Membership.js");
const Contact = require("../models/Contact.js");

const router = express.Router();

/**
 * POST /api/forms/membership
 */
router.post("/membership", async (req, res) => {
  try {
    const { name, email, phone, address, plan, startDate, notes } = req.body;

    if (!name || !email || !plan) {
      return res.status(400).json({ message: "Name, email, and plan are required" });
    }

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
      membership,
    });
  } catch (error) {
    console.error("Membership submission error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * GET /api/forms/membership
 */
router.get("/membership", async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (error) {
    console.error("Error fetching memberships:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/forms/contact
 */
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      address,
      message,
    });

    await contact.save();

    res.status(201).json({
      message: "Contact form submitted successfully",
      contact,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * GET /api/forms/contact
 */
router.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Export router using CommonJS
module.exports = router;
