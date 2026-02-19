import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: "Name, email, and message are required" 
      });
    }

    // Create new contact submission
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
      contact 
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
});

// GET /api/contact - Get all contact submissions (for admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

