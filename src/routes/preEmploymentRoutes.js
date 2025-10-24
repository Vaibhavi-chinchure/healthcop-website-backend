import express from "express";
import { getNurseRecordsBySite, updateNurseRecord } from "../handlers/preEmploymentHandler.js";

const router = express.Router();

// GET - fetch all nurse pre-employment records for a specific site
router.get("/site-records", getNurseRecordsBySite);

// PUT - update a record by id
router.put("/update/:id", updateNurseRecord);

export default router;
