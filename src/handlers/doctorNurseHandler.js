

// const doctorNurseService = require("../services/doctorNurseService");

// exports.addDoctorNurse = async (req, res, next) => {
//   try {
//     console.log("req.body (text fields):", req.body);
//     console.log("req.files:", req.files);

//     const data = {
//       ...req.body,
//       photo: req.files?.photo?.[0]?.path || null,
//       signature: req.files?.signature?.[0]?.path || null,
//       degreeCertificate: req.files?.degreeCertificate?.[0]?.path || null,
//       aadharCard: req.files?.aadharCard?.[0]?.path || null,
//       panCard: req.files?.panCard?.[0]?.path || null,
//       cancelledCheque: req.files?.cancelledCheque?.[0]?.path || null,
//       declaration: req.files?.declaration?.[0]?.path || null,
//       status: req.body.status || "Active",
//     };

//     if (!data.role || !data.name || !data.email) {
//       return res.status(400).json({ message: "Missing required text fields: role, name, email" });
//     }

//     const result = await doctorNurseService.addDoctorNurse(data);
//     res.status(201).json(result);
//   } catch (err) {
//     console.error("Handler error:", err);
//     next(err);
//   }
// };

// exports.getAllDoctorNurse = async (req, res, next) => {
//   try {
//     const result = await doctorNurseService.getAllDoctorNurse();
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getDoctorNurseById = async (req, res, next) => {
//   try {
//     const result = await doctorNurseService.getDoctorNurseById(req.params.id);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateDoctorNurse = async (req, res, next) => {
//   try {
//     const result = await doctorNurseService.updateDoctorNurse(req.params.id, req.body);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };
import { addDoctorNurse as addDoctorNurseService, getAllDoctorNurse as getAllDoctorNurseService, getDoctorNurseById as getDoctorNurseByIdService, updateDoctorNurse as updateDoctorNurseService } from "../services/doctorNurseService.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addDoctorNurse = async (req, res, next) => {
  try {
    console.log("req.body (text fields):", req.body);
    console.log("req.files:", req.files);

    const data = {
      ...req.body,
      photo: req.files?.photo?.[0]?.path || null,
      signature: req.files?.signature?.[0]?.path || null,
      degreeCertificate: req.files?.degreeCertificate?.[0]?.path || null,
      aadharCard: req.files?.aadharCard?.[0]?.path || null,
      panCard: req.files?.panCard?.[0]?.path || null,
      cancelledCheque: req.files?.cancelledCheque?.[0]?.path || null,
      declaration: req.files?.declaration?.[0]?.path || null,
      status: req.body.status || "Active",
    };

    if (!data.role || !data.name || !data.email) {
      return res.status(400).json({ message: "Missing required text fields: role, name, email" });
    }

    const result = await addDoctorNurseService(data);
    res.status(201).json(result);
  } catch (err) {
    console.error("Handler error:", err);
    next(err);
  }
};

export const getAllDoctorNurse = async (req, res, next) => {
  try {
    const result = await getAllDoctorNurseService();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getDoctorNurseById = async (req, res, next) => {
  try {
    const result = await getDoctorNurseByIdService(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateDoctorNurse = async (req, res, next) => {
  try {
    console.log("req.body (text fields):", req.body);
    console.log("req.files:", req.files);

    // Fetch existing record to get current file paths
    const existingRecord = await getDoctorNurseByIdService(req.params.id);

    const data = {
      ...req.body,
      photo: req.files?.photo?.[0]?.path || existingRecord.photo,
      signature: req.files?.signature?.[0]?.path || existingRecord.signature,
      degreeCertificate: req.files?.degreeCertificate?.[0]?.path || existingRecord.degreeCertificate,
      aadharCard: req.files?.aadharCard?.[0]?.path || existingRecord.aadharCard,
      panCard: req.files?.panCard?.[0]?.path || existingRecord.panCard,
      cancelledCheque: req.files?.cancelledCheque?.[0]?.path || existingRecord.cancelledCheque,
      declaration: req.files?.declaration?.[0]?.path || existingRecord.declaration,
      status: req.body.status || existingRecord.status || "Active",
    };

    // Delete old files if new ones are uploaded
    const fileFields = ["photo", "signature", "degreeCertificate", "aadharCard", "panCard", "cancelledCheque", "declaration"];
    for (const field of fileFields) {
      if (req.files?.[field]?.[0]?.path && existingRecord[field]) {
        try {
          await fs.unlink(path.join(__dirname, "..", existingRecord[field]));
          console.log(`Deleted old file: ${existingRecord[field]}`);
        } catch (err) {
          console.error(`Failed to delete old file ${existingRecord[field]}:`, err.message);
        }
      }
    }

    const result = await updateDoctorNurseService(req.params.id, data);
    res.status(200).json(result);
  } catch (err) {
    console.error("Handler error:", err);
    next(err);
  }
};
