const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const authenticateToken = require("../middleware/auth");

// Apply authentication to all routes
router.use(authenticateToken);

/**
 * GET all customers for logged-in user
 */
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(customers);
  } catch (error) {
    console.error("GET customers error:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch customers" });
  }
});

/**
 * ADD customer (Add Customer modal)
 * UI sends: name, mobile, address, item
 */
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { name, mobile, address, item } = req.body;

    const customer = new Customer({
      userId: req.user.userId,
      name,
      mobile,
      address,
      entries: item ? [{ item }] : [],
    });

    const savedCustomer = await customer.save();
    console.log("SAVED DOC:", savedCustomer);

    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("POST customer error:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to create customer" });
  }
});

/**
 * UPDATE customer (Edit modal)
 */
router.put("/:id", async (req, res) => {
  try {
    const { name, address, entries } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, address, entries },
      { new: true },
    );

    res.json(updatedCustomer);
  } catch (error) {
    console.error("PUT customer error:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to update customer" });
  }
});

/**
 * DELETE customer
 */
router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
