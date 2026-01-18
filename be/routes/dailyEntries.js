const express = require("express");
const DailyEntry = require("../models/DailyEntry");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

/**
 * GET all entries - Simple endpoint to view all data
 */
router.get("/all", async (req, res) => {
  try {
    const entries = await DailyEntry.find({ userId: req.user.userId }).populate(
      "customer",
      "name",
    );

    const mappedEntries = entries.map((e) => ({
      id: e._id,
      date: e.date,
      customer: e.customer?.name || "",
      customerId: e.customer?._id || null,
      garlic: e.garlicQty,
      amount: e.totalAmount,
    }));

    res.json(mappedEntries);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch entries", error: err.message });
  }
});

/**
 * GET entries by date (or all if no date provided)
 */
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    let query = { userId: req.user.userId };
    if (date) {
      query.date = date;
    }

    const entries = await DailyEntry.find(query)
      .populate("customer", "name")
      .sort({ date: -1 });

    const mappedEntries = entries.map((e) => ({
      id: e._id,
      date: e.date,
      customer: e.customer?.name || "Unknown",
      customerId: e.customer?._id || null,
      garlic: e.garlicQty,
      amount: e.totalAmount,
    }));

    res.json(mappedEntries);
  } catch (err) {
    console.error("❌ Error in GET /:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch entries", error: err.message });
  }
});

/**
 * ADD entry
 */
router.post("/", async (req, res) => {
  try {
    const { date, customer, garlicQty, garlicRate } = req.body;

    const entry = await DailyEntry.create({
      userId: req.user.userId,
      date,
      customer,
      garlicQty,
      garlicRate,
      totalAmount: garlicQty * garlicRate,
    });

    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: "Failed to add entry" });
  }
});

/**
 * UPDATE entry
 */
router.put("/:id", async (req, res) => {
  try {
    const { date, customer, garlicQty, garlicRate } = req.body;

    await DailyEntry.findByIdAndUpdate(req.params.id, {
      date,
      customer,
      garlicQty,
      garlicRate,
      totalAmount: garlicQty * garlicRate,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: "Failed to update entry" });
  }
});

/**
 * DELETE entry
 */
router.delete("/:id", async (req, res) => {
  try {
    await DailyEntry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete entry" });
  }
});

module.exports = router;
