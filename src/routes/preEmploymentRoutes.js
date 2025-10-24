const express = require("express");
const router = express.Router();
const { getNurseRecordsBySite, updateNurseRecord } = require("../handlers/preEmploymentHandler");

router.get("/site-records", getNurseRecordsBySite);
router.put("/update/:id", updateNurseRecord);

module.exports = router;
