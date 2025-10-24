import express from "express";
import multer from "multer";
import * as clientHandler from "../handlers/clientHandler.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// ===== Multer Storage Config =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/clientsorders/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type: Only PDFs allowed for Work Orders"), false);
    }
  },
});

// ===== Routes =====
const router = express.Router();

router.post(
  "/",
  authMiddleware("admin"),
  upload.any(),
  clientHandler.addClient
);

router.get("/", clientHandler.getAllClients);

router.get("/:id", clientHandler.getClientById);

router.put(
  "/:id",
  authMiddleware("admin"),
  upload.any(), // Handle dynamic site_X_workOrder fields
  clientHandler.updateClient
);

router.delete("/:id", authMiddleware("admin"), clientHandler.deleteClient);

export default router;
