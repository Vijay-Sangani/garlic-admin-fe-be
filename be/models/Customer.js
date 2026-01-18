const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    trim: true,
  },
});

const CustomerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },

    // 🔥 ONLY THIS FIELD FOR ITEMS
    entries: {
      type: [EntrySchema],
      default: [],
    },
  },
  {
    timestamps: true,
    strict: true, // 🔒 VERY IMPORTANT (ROOT FIX)
  },
);

module.exports = mongoose.model("Customer", CustomerSchema);
