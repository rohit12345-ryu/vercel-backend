const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

/**
 * POST /api/contact
 * Save a contact message
 */
router.post("/", async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      message: req.body.message,
    });

    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Contact submission failed" });
  }
});

module.exports = router;
