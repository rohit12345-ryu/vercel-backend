const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({
    message: "Welcome to Dashboard",
    userId: req.userId,
  });
});

module.exports = router;
