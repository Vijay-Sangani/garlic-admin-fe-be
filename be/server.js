const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customers");
const dailyEntryRoutes = require("./routes/dailyEntries");
const paymentRoutes = require("./routes/payments");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/daily-entries", dailyEntryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
