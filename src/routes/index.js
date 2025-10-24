import express from "express";
import authRoutes from "./authRoutes.js";

const router = express.Router();

// mount them
router.use("/", authRoutes);

export default router;
