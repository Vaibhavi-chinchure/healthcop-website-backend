// routes/index.js
const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");

// mount them
router.use("/", authRoutes);

module.exports = router;
