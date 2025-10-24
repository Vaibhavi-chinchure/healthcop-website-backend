import express from "express";
import { getNurseRecordsBySite, updateNurseRecord } from "../handlers/preEmploymentHandler.js";

const router = express.Router();

router.get("/site-records", getNurseRecordsBySite);
router.put("/update/:id", updateNurseRecord);

export default router;
