// // clientRoutes.js

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const clientHandler = require("../handlers/clientHandler");
// const authMiddleware = require("../middlewares/authMiddleware");

// // ===== Multer Storage Config =====
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/clientsorders/"); // ✅ Save inside clientsorders folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });


// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type: Only PDFs allowed for Work Orders"), false);
//     }
//   },
// });

// // ===== Routes =====

// // Add Client (with sites + officers + workOrders)
// router.post(
//   "/",
//   authMiddleware("admin"),
//   upload.any(), // accept dynamic site_X_workOrder fields
//   clientHandler.addClient
// );

// // Get all clients
// router.get("/", clientHandler.getAllClients);

// // Get client by ID (with sites + officers)
// router.get("/:id", clientHandler.getClientById);

// // Update client
// router.put("/:id", authMiddleware("admin"), clientHandler.updateClient);

// // Delete client
// router.delete("/:id", authMiddleware("admin"), clientHandler.deleteClient);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const clientHandler = require("../handlers/clientHandler");
const authMiddleware = require("../middlewares/authMiddleware");

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

module.exports = router;
