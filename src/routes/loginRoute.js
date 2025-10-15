const express = require("express");
const router = express.Router();
const loginHandler = require("../handlers/loginHandler");

// GET - fetch user details by email
router.get("/user", loginHandler.getUserDetailsByEmailHandler);

module.exports = router;
