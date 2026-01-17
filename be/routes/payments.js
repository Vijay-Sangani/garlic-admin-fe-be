const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const DailyEntry = require("../models/DailyEntry");

/**
 * GET all payments (sorted by date descending)
 */
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("customerId", "name mobile address")
      .sort({ date: -1 });

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

/**
 * GET payments by date (for today/current date)
 */
router.get("/by-date/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const payments = await Payment.find({
      date: { $gte: startDate, $lte: endDate },
    })
      .populate("customerId", "name mobile address")
      .sort({ date: -1 });

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments by date:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

/**
 * GET outstanding/pending amount by customer for current month
 */
router.get("/outstanding/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    // Get current month start and end dates
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Get total revenue (sold amount) for this customer in current month
    const entries = await DailyEntry.find({
      customer: customerId,
      date: {
        $gte: currentMonthStart.toISOString().split("T")[0],
        $lte: currentMonthEnd.toISOString().split("T")[0],
      },
    });

    const totalRevenue = entries.reduce(
      (sum, entry) => sum + (entry.totalAmount || 0),
      0
    );

    // Get total payments received for this customer in current month
    const payments = await Payment.find({
      customerId: customerId,
      date: {
        $gte: currentMonthStart,
        $lte: currentMonthEnd,
      },
    });

    const totalPaid = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    // Outstanding = Total Revenue - Total Paid
    const outstanding = Math.max(0, totalRevenue - totalPaid);

    res.json({ outstanding, totalRevenue, totalPaid });
  } catch (error) {
    console.error("Error calculating outstanding:", error);
    res.status(500).json({ error: "Failed to calculate outstanding" });
  }
});

/**
 * GET total pending amount for current month (all customers)
 */
router.get("/summary/pending-total", async (req, res) => {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Get all entries for current month
    const entries = await DailyEntry.find({
      date: {
        $gte: currentMonthStart.toISOString().split("T")[0],
        $lte: currentMonthEnd.toISOString().split("T")[0],
      },
    });

    const totalRevenue = entries.reduce(
      (sum, entry) => sum + (entry.totalAmount || 0),
      0
    );

    // Get all payments for current month
    const payments = await Payment.find({
      date: {
        $gte: currentMonthStart,
        $lte: currentMonthEnd,
      },
    });

    const totalPaid = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    // Pending = Total Revenue - Total Paid
    const totalPending = Math.max(0, totalRevenue - totalPaid);

    res.json({
      totalPending,
      totalRevenue,
      totalPaid,
      month: now.toLocaleString("en-US", { month: "long", year: "numeric" }),
    });
  } catch (error) {
    console.error("Error calculating pending total:", error);
    res.status(500).json({ error: "Failed to calculate pending total" });
  }
});

/**
 * CREATE a new payment
 */
router.post("/", async (req, res) => {
  try {
    const { customerId, amount, mode, date, notes } = req.body;

    if (!customerId || !amount || !mode || !date) {
      return res.status(400).json({
        error:
          "All required fields must be provided (customerId, amount, mode, date)",
      });
    }

    const newPayment = new Payment({
      customerId,
      amount: parseFloat(amount),
      mode: mode.toLowerCase(),
      date: new Date(date),
      notes: notes || null,
    });

    const savedPayment = await newPayment.save();
    const populatedPayment = await savedPayment.populate(
      "customerId",
      "name mobile address"
    );

    res.status(201).json(populatedPayment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

/**
 * UPDATE a payment by ID
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, mode, date, notes } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        amount: parseFloat(amount),
        mode: mode.toLowerCase(),
        date: new Date(date),
        notes: notes || null,
      },
      { new: true }
    ).populate("customerId", "name mobile address");

    if (!updatedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json(updatedPayment);
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Failed to update payment" });
  }
});

/**
 * DELETE a payment by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ error: "Failed to delete payment" });
  }
});

module.exports = router;
