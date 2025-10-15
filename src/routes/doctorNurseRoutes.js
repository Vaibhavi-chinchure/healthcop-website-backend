


// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const doctorNurseHandler = require("../handlers/doctorNurseHandler");
// // const authMiddleware = require("../middlewares/authMiddleware");

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
// //     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
// //   },
// // });

// // const upload = multer({
// //   storage: storage,
// //   limits: { fileSize: 10 * 1024 * 1024 },
// //   fileFilter: (req, file, cb) => {
// //     if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
// //       cb(null, true);
// //     } else {
// //       cb(new Error("Invalid file type: Only images and PDFs allowed"), false);
// //     }
// //   },
// // });

// // router.post(
// //   "/",
// //   authMiddleware("admin"),
// //   upload.fields([
// //     { name: "photo", maxCount: 1 },
// //     { name: "signature", maxCount: 1 },
// //     { name: "degreeCertificate", maxCount: 1 },
// //     { name: "aadharCard", maxCount: 1 },
// //     { name: "panCard", maxCount: 1 },
// //     { name: "cancelledCheque", maxCount: 1 },
// //     { name: "declaration", maxCount: 1 },
// //   ]),
// //   doctorNurseHandler.addDoctorNurse
// // );

// // router.get("/", doctorNurseHandler.getAllDoctorNurse);
// // router.get("/:id", doctorNurseHandler.getDoctorNurseById);
// // router.put("/:id", doctorNurseHandler.updateDoctorNurse);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const doctorNurseHandler = require("../handlers/doctorNurseHandler");
// const authMiddleware = require("../middlewares/authMiddleware");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     // Sanitize the original filename
//     const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_").replace(/[^a-zA-Z0-9.-]/g, "");
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type: Only images and PDFs allowed"), false);
//     }
//   },
// });

// router.post(
//   "/",
//   authMiddleware("admin"),
//   upload.fields([
//     { name: "photo", maxCount: 1 },
//     { name: "signature", maxCount: 1 },
//     { name: "degreeCertificate", maxCount: 1 },
//     { name: "aadharCard", maxCount: 1 },
//     { name: "panCard", maxCount: 1 },
//     { name: "cancelledCheque", maxCount: 1 },
//     { name: "declaration", maxCount: 1 },
//   ]),
//   doctorNurseHandler.addDoctorNurse
// );

// router.get("/", doctorNurseHandler.getAllDoctorNurse);
// router.get("/:id", doctorNurseHandler.getDoctorNurseById);
// router.put("/:id", doctorNurseHandler.updateDoctorNurse);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const doctorNurseHandler = require("../handlers/doctorNurseHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_").replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type: Only images and PDFs allowed"), false);
    }
  },
});

router.post(
  "/",
  authMiddleware("admin"),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "cancelledCheque", maxCount: 1 },
    { name: "declaration", maxCount: 1 },
  ]),
  doctorNurseHandler.addDoctorNurse
);

router.get("/", authMiddleware("admin"), doctorNurseHandler.getAllDoctorNurse);
router.get("/:id", authMiddleware("admin"), doctorNurseHandler.getDoctorNurseById);
router.put(
  "/:id",
  authMiddleware("admin"),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "cancelledCheque", maxCount: 1 },
    { name: "declaration", maxCount: 1 },
  ]),
  doctorNurseHandler.updateDoctorNurse
);

module.exports = router;