// Add this to your server.js or create a new file and import it

const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const DailyEntry = require("../models/DailyEntry");
const Payment = require("../models/Payment");
const User = require("../models/User");
const authenticateToken = require("../middleware/auth");

/**
 * DEBUG ENDPOINT - Check database for logged-in user
 */
router.get("/debug/user-info", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    res.json({
      token: {
        userId: req.user.userId,
        email: req.user.email,
        role: req.user.role,
      },
      userFromDb: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DEBUG ENDPOINT - Check all customers in database for this user
 */
router.get("/debug/all-customers", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check without filter
    const allCustomers = await Customer.find();

    // Check with filter
    const userCustomers = await Customer.find({ userId });

    res.json({
      userId: userId,
      totalCustomersInDb: allCustomers.length,
      yourCustomers: userCustomers.length,
      yourCustomersData: userCustomers,
      allCustomersData: allCustomers, // Shows if data exists at all
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DEBUG ENDPOINT - Check all daily entries for this user
 */
router.get("/debug/all-entries", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const allEntries = await DailyEntry.find();
    const userEntries = await DailyEntry.find({ userId });

    res.json({
      userId: userId,
      totalEntriesInDb: allEntries.length,
      yourEntries: userEntries.length,
      yourEntriesData: userEntries,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DEBUG ENDPOINT - Check all payments for this user
 */
router.get("/debug/all-payments", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const allPayments = await Payment.find();
    const userPayments = await Payment.find({ userId });

    res.json({
      userId: userId,
      totalPaymentsInDb: allPayments.length,
      yourPayments: userPayments.length,
      yourPaymentsData: userPayments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
