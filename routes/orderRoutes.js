const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route POST /api/orders
 * @desc  Create new order (logged-in user)
 */
router.post("/", protect, async (req, res) => {
  try {
    const order = new Order({
      user: req.userId,
      items: req.body.items,
      total: req.body.total,
      customer: req.body.customer,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
});

/**
 * @route GET /api/orders
 * @desc  Return orders for the authenticated user
 */
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
