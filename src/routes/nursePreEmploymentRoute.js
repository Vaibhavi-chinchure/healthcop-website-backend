// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const path = require("path");
// // const authMiddleware = require("../middlewares/authMiddleware");
// // const nursePreEmploymentHandler = require("../handlers/nursePreEmploymentHandle");

// // // ✅ Configure multer storage
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/nurse_preemployment/");
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// //     const ext = path.extname(file.originalname);
// //     const baseName = path
// //       .basename(file.originalname, ext)
// //       .replace(/\s+/g, "_")
// //       .replace(/[^a-zA-Z0-9.-]/g, "");
// //     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
// //   },
// // });

// // // ✅ Multer configuration
// // const upload = multer({
// //   storage: storage,
// //   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
// //   fileFilter: (req, file, cb) => {
// //     // Allow only PDFs and images
// //     if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
// //       cb(null, true);
// //     } else {
// //       cb(new Error("Invalid file type: Only images and PDFs allowed"), false);
// //     }
// //   },
// // });

// // // ✅ Add new pre-employment record
// // router.post(
// //   "/",
// //   authMiddleware("admin"),
// //   upload.fields([
// //     { name: "photo", maxCount: 1 },
// //     { name: "signature", maxCount: 1 },
// //     { name: "aadharCard", maxCount: 1 },
// //     { name: "panCard", maxCount: 1 },
// //     { name: "degreeCertificate", maxCount: 1 },
// //     { name: "medicalCertificate", maxCount: 1 },
// //     { name: "experienceCertificate", maxCount: 1 },
// //     { name: "policeVerification", maxCount: 1 },
// //   ]),
// //   nursePreEmploymentHandler.addPreEmployment
// // );

// // // ✅ Get all pre-employment records
// // router.get("/", authMiddleware("admin"), nursePreEmploymentHandler.getAllPreEmployment);

// // // ✅ Get one record by ID
// // router.get("/:id", authMiddleware("admin"), nursePreEmploymentHandler.getPreEmploymentById);

// // // ✅ Update record by ID
// // router.put(
// //   "/:id",
// //   authMiddleware("admin"),
// //   upload.fields([
// //     { name: "photo", maxCount: 1 },
// //     { name: "signature", maxCount: 1 },
// //     { name: "aadharCard", maxCount: 1 },
// //     { name: "panCard", maxCount: 1 },
// //     { name: "degreeCertificate", maxCount: 1 },
// //     { name: "medicalCertificate", maxCount: 1 },
// //     { name: "experienceCertificate", maxCount: 1 },
// //     { name: "policeVerification", maxCount: 1 },
// //   ]),
// //   nursePreEmploymentHandler.updatePreEmployment
// // );

// // // ✅ Delete record by ID
// // router.delete("/:id", authMiddleware("admin"), nursePreEmploymentHandler.deletePreEmployment);

// // module.exports = router;
// // routes/nursePreEmployment.js

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const authMiddleware = require("../middlewares/authMiddleware");
// const { addPreEmployment, getAllPreEmployment, getPreEmploymentById, updatePreEmployment, deletePreEmployment } = require("../handlers/nursePreEmploymentHandle");  // ✅ Fixed: added 'r'
// // ✅ Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Ensure the uploads directory exists
//     const fs = require('fs');
//     const dir = 'uploads/nurse_preemployment';
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     const baseName = path
//       .basename(file.originalname, ext)
//       .replace(/\s+/g, "_")
//       .replace(/[^a-zA-Z0-9.-]/g, "");
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   },
// });

// // ✅ Multer configuration
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
//   fileFilter: (req, file, cb) => {
//     // Allow only images
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type: Only images allowed"), false);
//     }
//   },
// });

// // ✅ Add new pre-employment records (for 1+ laborers)
// // ✅ Add new pre-employment records (for 1+ laborers)
// router.post(
//   "/",
//   authMiddleware(["admin", "nurse", "doctor"]),
//   upload.fields([
//     { name: "heightPhobiaImage", maxCount: 10 },       // allow up to 10 images
//     { name: "physicalDeformityImage", maxCount: 10 }, // allow up to 10 images
//   ]),
//   addPreEmployment
// );



// // ✅ Get all pre-employment records
// router.get("/", authMiddleware("admin"), getAllPreEmployment);

// // ✅ Get one record by ID
// router.get("/:id", authMiddleware("admin"), getPreEmploymentById);

// // ✅ Update record by ID
// router.put(
//   "/:id",
//   authMiddleware("admin"),
//   upload.fields([
//     { name: "heightPhobiaImage", maxCount: 1 },
//     { name: "physicalDeformityImage", maxCount: 1 },
//   ]),
//   updatePreEmployment
// );

// // ✅ Delete record by ID
// router.delete("/:id", authMiddleware("admin"), deletePreEmployment);

// module.exports = router;

////<-------------------save working code above--------------------->


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const { addPreEmployment, getAllPreEmployment, getPreEmploymentById, updatePreEmployment, deletePreEmployment } = require("../handlers/nursePreEmploymentHandle");  // ✅ Fixed: added 'r'
// ✅ Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the uploads directory exists
    const fs = require('fs');
    const dir = 'uploads/nurse_preemployment';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// ✅ Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    // Allow only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type: Only images allowed"), false);
    }
  },
});

// ✅ Add new pre-employment records (for 1+ laborers)
// ✅ Add new pre-employment records (for 1+ laborers)
router.post(
  "/",
  authMiddleware(["admin", "nurse", "doctor"]),
  upload.fields([
    { name: "heightPhobiaImage", maxCount: 10 },       // allow up to 10 images
    { name: "physicalDeformityImage", maxCount: 10 }, // allow up to 10 images
  ]),
  addPreEmployment
);



// ✅ Get all pre-employment records
router.get("/", authMiddleware(["admin", "nurse", "doctor"]), getAllPreEmployment);

// ✅ Get one record by ID
router.get("/:id", authMiddleware(["admin", "nurse", "doctor"]), getPreEmploymentById);

// ✅ Generate PDF for a specific record
router.get("/:id/pdf", authMiddleware(["admin", "nurse", "doctor"]), async (req, res) => {
  try {
    const { generatePDF } = require("../handlers/nursePreEmploymentHandle.js");
    await generatePDF(req, res);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// ✅ Update record by ID
router.put(
  "/:id",
  authMiddleware(["admin", "nurse", "doctor"]),
  upload.fields([
    { name: "heightPhobiaImage", maxCount: 1 },
    { name: "physicalDeformityImage", maxCount: 1 },
  ]),
  updatePreEmployment
);

// ✅ Delete record by ID
router.delete("/:id", authMiddleware(["admin", "nurse", "doctor"]), deletePreEmployment);

module.exports = router;