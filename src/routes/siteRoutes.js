const express = require("express");
const router = express.Router();
const { getAllSitesHandler } = require("../handlers/siteHandler");

router.get("/sites", getAllSitesHandler);

module.exports = router;
