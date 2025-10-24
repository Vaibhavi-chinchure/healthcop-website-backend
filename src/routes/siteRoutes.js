import express from "express";
import { getAllSitesHandler } from "../handlers/siteHandler.js";

const router = express.Router();

router.get("/sites", getAllSitesHandler);

export default router;
