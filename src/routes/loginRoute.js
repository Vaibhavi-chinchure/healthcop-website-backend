import express from "express";
import { getUserDetailsByEmailHandler } from "../handlers/loginHandler.js";

const router = express.Router();

// GET - fetch user details by email
router.get("/user", getUserDetailsByEmailHandler);

export default router;
