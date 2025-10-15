// const express = require("express");
// const router = express.Router();
// const { getNurseRecordsBySite } = require("../handlers/preEmploymentHandler");

// // GET - fetch all nurse pre-employment records for a specific site
// router.get("/site-records", getNurseRecordsBySite);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { getNurseRecordsBySite, updateNurseRecord } = require("../handlers/preEmploymentHandler");

// GET - fetch all nurse pre-employment records for a specific site
router.get("/site-records", getNurseRecordsBySite);

// PUT - update a record by id
router.put("/update/:id", updateNurseRecord);

module.exports = router;
