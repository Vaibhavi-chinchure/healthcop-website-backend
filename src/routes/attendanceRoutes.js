import express from "express";
import { loginHandler, logoutHandler, getAllSessionsHandler } from "../handlers/attendanceHandler.js";

const router = express.Router();

router.post("/login", loginHandler);
router.put("/logout/:id", logoutHandler);
router.get("/user/:userId", getAllSessionsHandler);

export default router;
