import express from "express";
import { signup, login, resetPassword } from "../handlers/authHandler.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// 🔹 Add reset password route
router.post("/reset-password", resetPassword);

export default router;
