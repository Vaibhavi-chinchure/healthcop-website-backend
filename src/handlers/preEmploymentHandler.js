const express = require("express");
const router = express.Router();
const { getNurseRecordsBySite, updateNurseRecord } = require("../handlers/preEmploymentHandler");

router.get("/site-records", getNurseRecordsBySite);
router.put("/update/:id", updateNurseRecord);

module.exports = router;
const { getNurseRecordsBySiteService, updateNurseRecordService } = require("../services/preEmploymentServices");

const getNurseRecordsBySite = async (req, res) => {
  try {
    const { site_id } = req.query;
    if (!site_id) {
      return res.status(400).json({ message: "Site ID is required" });
    }
    const records = await getNurseRecordsBySiteService(site_id);
    res.status(200).json(records);
  } catch (error) {
    console.error("Handler Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateNurseRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const recordData = req.body;
    if (!id) return res.status(400).json({ message: "Record ID is required" });
    await updateNurseRecordService(id, recordData);
    res.status(200).json({ message: "Record updated successfully" });
  } catch (error) {
    console.error("Update Handler Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getNurseRecordsBySite, updateNurseRecord };
