const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Customer = require("../models/Customer");
const DailyEntry = require("../models/DailyEntry");
const Payment = require("../models/Payment");

/**
 * GET total user count and list all users
 */
router.get("/users", async (req, res) => {
  try {
    const count = await User.countDocuments();
    const users = await User.find({}, "name email role createdAt -_id").sort({
      createdAt: -1,
    });

    res.json({
      totalUsers: count,
      users: users,
    });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Failed to fetch user count" });
  }
});

/**
 * GET user count only
 */
router.get("/users/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Failed to fetch user count" });
  }
});

/**
 * DELETE a user by email and all their data
 */
router.delete("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id;

    // Delete all user's data
    await Customer.deleteMany({ userId });
    await DailyEntry.deleteMany({ userId });
    await Payment.deleteMany({ userId });
    await User.deleteOne({ _id: userId });

    res.json({
      message: `User ${email} and all their data deleted successfully`,
      deletedUser: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
