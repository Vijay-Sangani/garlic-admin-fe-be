const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

/**
 * GET all customers
 */
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
});

/**
 * ADD customer (Add Customer modal)
 * UI sends: name, mobile, address, item
 */
router.post("/", async (req, res) => {
  console.log("REQ BODY:", req.body); // TEMP LOG

  const { name, mobile, address, item } = req.body;

  const customer = new Customer({
    name,
    mobile,
    address,
    entries: item ? [{ item }] : [],
  });

  const savedCustomer = await customer.save();
  console.log("SAVED DOC:", savedCustomer); // TEMP LOG

  res.status(201).json(savedCustomer);
});

/**
 * UPDATE customer (Edit modal)
 */
router.put("/:id", async (req, res) => {
  const { name, address, entries } = req.body;

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name, address, entries },
    { new: true }
  );

  res.json(updatedCustomer);
});

/**
 * DELETE customer
 */
router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
