// import { getNurseRecordsBySiteService, updateNurseRecordService } from "../services/preEmploymentServices.js";

// // GET - fetch all nurse pre-employment records for a specific site
// const getNurseRecordsBySite = async (req, res) => {
//   try {
//     const { site_id } = req.query;
//     if (!site_id) {
//       return res.status(400).json({ message: "Site ID is required" });
//     }
//     const records = await getNurseRecordsBySiteService(site_id);
//     res.status(200).json(records);
//   } catch (error) {
//     console.error("Handler Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // PUT - update a nurse pre-employment record by id
// const updateNurseRecord = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const recordData = req.body;

//     if (!id) return res.status(400).json({ message: "Record ID is required" });

//     await updateNurseRecordService(id, recordData);
//     res.status(200).json({ message: "Record updated successfully" });
//   } catch (error) {
//     console.error("Update Handler Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export { getNurseRecordsBySite, updateNurseRecord };

import { getNurseRecordsBySiteService, updateNurseRecordService } from "../services/preEmploymentServices.js";

// GET - fetch all nurse pre-employment records for a specific site
const getNurseRecordsBySite = async (req, res) => {
  try {
    const { site_id } = req.query;
    if (!site_id) {
      return res.status(400).json({ message: "Site ID is required" });
    }
    const records = await getNurseRecordsBySiteService(site_id);
    res.status(200).json(records);
  } catch (error) {
    console.error("Handler Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT - update a nurse pre-employment record by id
const updateNurseRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const recordData = req.body;

    if (!id) return res.status(400).json({ message: "Record ID is required" });
    if (!recordData.status) return res.status(400).json({ message: "Status is required for update" });

    const result = await updateNurseRecordService(id, recordData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Update Handler Error:", {
      message: error.message,
      sqlMessage: error.sqlMessage,
      sql: error.sql,
    });
    if (error.sqlMessage?.includes("Column 'laborer_id' cannot be null")) {
      res.status(400).json({ message: "laborer_id cannot be null" });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};

export { getNurseRecordsBySite, updateNurseRecord };