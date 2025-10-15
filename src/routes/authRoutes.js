// const express = require("express");
// const router = express.Router();
// const authHandler = require("../handlers/authHandler");

// router.post("/signup", authHandler.signup);
// router.post("/login", authHandler.login);

// module.exports = router;
const express = require("express");
const router = express.Router();
const authHandler = require("../handlers/authHandler");

router.post("/signup", authHandler.signup);
router.post("/login", authHandler.login);

// 🔹 Add reset password route
router.post("/reset-password", authHandler.resetPassword);

module.exports = router;
