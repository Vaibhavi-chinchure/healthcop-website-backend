// // // // src/handlers/nursePreEmploymentHandler.js

// // // import pool from "../config/db.js";
// // // import * as queries from "../constants/nursePreEmploymentQuery.js";

// // // export const addPreEmployment = async (req, res) => {
// // //   const { data: dataStr } = req.body || {};
// // //   const heightFiles = req.files?.heightPhobiaImage || [];
// // //   const deformityFiles = req.files?.physicalDeformityImage || [];
// // //   if (!dataStr) {
// // //     return res.status(400).json({ error: "No data provided" });
// // //   }
// // //   let laborersData;
// // //   try {
// // //     laborersData = JSON.parse(dataStr);
// // //   } catch (err) {
// // //     return res.status(400).json({ error: "Invalid data format" });
// // //   }
// // //   if (!Array.isArray(laborersData) || laborersData.length === 0 || laborersData.length > 10) {
// // //     return res.status(400).json({ error: "Must provide 1-10 laborers" });
// // //   }
// // //   if (heightFiles.length > laborersData.length || deformityFiles.length > laborersData.length) {
// // //     return res.status(400).json({ error: "Too many files uploaded" });
// // //   }
// // //   const createdBy = req.user?.username || "admin";
// // //   const connection = await pool.getConnection();
// // //   try {
// // //     await connection.beginTransaction();
// // //     // Generate starting ID number
// // //     const [lastRecord] = await connection.query(`
// // //       SELECT laborer_id FROM nurse_pre_employment WHERE laborer_id LIKE 'LAB-PRE-%'
// // //       ORDER BY CAST(SUBSTRING(laborer_id, 9) AS UNSIGNED) DESC LIMIT 1
// // //     `);
// // //     let newIdNumber = 1;
// // //     if (lastRecord.length > 0 && lastRecord[0].laborer_id) {
// // //       const lastNumber = parseInt(lastRecord[0].laborer_id.split("-")[2], 10);
// // //       if (!isNaN(lastNumber)) newIdNumber = lastNumber + 1;
// // //     }
// // //     const newLaborerIds = [];
// // //     let insertedCount = 0;
// // //     for (let i = 0; i < laborersData.length; i++) {
// // //       const laborer = laborersData[i];
// // //       if (!laborer.name || !laborer.name.trim()) {
// // //         continue; // Skip unfilled
// // //       }
// // //       const idNum = newIdNumber + insertedCount;
// // //       const newLaborerId = `LAB-PRE-${idNum.toString().padStart(4, "0")}`;
// // //       newLaborerIds.push(newLaborerId);
// // //       // Ensure JSON strings for marks
// // //       const mark1 = typeof laborer.identificationMark1 === "string"
// // //         ? laborer.identificationMark1
// // //         : JSON.stringify(laborer.identificationMark1 || []);
// // //       const mark2 = typeof laborer.identificationMark2 === "string"
// // //         ? laborer.identificationMark2
// // //         : JSON.stringify(laborer.identificationMark2 || []);
// // //       const values = [
// // //         newLaborerId,
// // //         createdBy,
// // //         laborer.name || "",
// // //         laborer.certificateSerialNo || "",
// // //         laborer.date ? new Date(laborer.date) : null,
// // //         laborer.parentage || "",
// // //         mark1,
// // //         mark2,
// // //         laborer.sex || "",
// // //         laborer.residence || "",
// // //         laborer.dateOfBirth ? new Date(laborer.dateOfBirth) : null,
// // //         laborer.certificateAge ? parseInt(laborer.certificateAge, 10) : null,
// // //         laborer.reasonFor || "",
// // //         laborer.height ? parseFloat(laborer.height) : null,
// // //         laborer.weight ? parseFloat(laborer.weight) : null,
// // //         laborer.bmi ? parseFloat(laborer.bmi) : null,
// // //         laborer.bodyTemp ? parseFloat(laborer.bodyTemp) : null,
// // //         laborer.nearVision || "",
// // //         laborer.farVision || "",
// // //         laborer.bp || "",
// // //         laborer.pulse ? parseInt(laborer.pulse, 10) : null,
// // //         laborer.systemic || "",
// // //         laborer.knownCaseOfEpilepsy || "",
// // //         laborer.frequentHeadache || "",
// // //         laborer.limpingGait || "",
// // //         laborer.physicalDeformity || "",
// // //         laborer.flatFoot || "",
// // //         laborer.mentalDepression || "",
// // //         laborer.heightPhobia || "",
// // //         heightFiles[insertedCount] ? heightFiles[insertedCount].filename : null,
// // //         deformityFiles[insertedCount] ? deformityFiles[insertedCount].filename : null,
// // //         laborer.sugarLevel ? parseFloat(laborer.sugarLevel) : null,
// // //         laborer.bloodGroup || "",
// // //         laborer.pallor || "No",
// // //         laborer.lymphadenopathy || "No",
// // //         laborer.icterus || "No",
// // //         laborer.cyanosis || "No",
// // //         laborer.edema || "No",
// // //         laborer.medicalHistory || "",
// // //         laborer.otherHealthInfo || "",
// // //         laborer.otherHealthDetails || "",
// // //         laborer.finalConclusion || ""
// // //       ];
// // //       // Debug: Log array length (remove after success)
// // //       console.log(`Values array length: ${values.length} (should be 42)`);
// // //       const [result] = await connection.query(queries.INSERT_LABORER, values);
// // //       if (result.affectedRows === 0) {
// // //         throw new Error(`Failed to insert laborer ${insertedCount + 1}`);
// // //       }
// // //       insertedCount++;
// // //     }
// // //     if (insertedCount === 0) {
// // //       throw new Error("No valid laborers to insert");
// // //     }
// // //     await connection.commit();
// // //     res.json({ message: `${insertedCount} laborers added successfully`, laborer_ids: newLaborerIds });
// // //   } catch (err) {
// // //     await connection.rollback();
// // //     console.error("❌ addPreEmployment failed:", err);
// // //     res.status(500).json({ error: err.message });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // };

// // // export const getAllPreEmployment = async (req, res) => {
// // //   try {
// // //     const [rows] = await pool.query(queries.GET_ALL_LABORERS);

// // //     const laborers = rows.map((row) => ({
// // //       id: row.id,
// // //       laborer_id: row.laborer_id,
// // //       created_by: row.created_by,
// // //       name: row.name,
// // //       certificate_serial_no: row.certificate_serial_no,
// // //       date: row.date,
// // //       parentage: row.parentage,
// // //       identification_mark1: row.identification_mark1 ? JSON.parse(row.identification_mark1) : [],
// // //       identification_mark2: row.identification_mark2 ? JSON.parse(row.identification_mark2) : [],
// // //       sex: row.sex,
// // //       residence: row.residence,
// // //       date_of_birth: row.date_of_birth,
// // //       certificate_age: row.certificate_age,
// // //       reason_for: row.reason_for,
// // //       height: row.height,
// // //       weight: row.weight,
// // //       bmi: row.bmi,
// // //       body_temp: row.body_temp,
// // //       near_vision: row.near_vision,
// // //       far_vision: row.far_vision,
// // //       bp: row.bp,
// // //       pulse: row.pulse,
// // //       systemic: row.systemic,
// // //       known_case_of_epilepsy: row.known_case_of_epilepsy,
// // //       frequent_headache: row.frequent_headache,
// // //       limping_gait: row.limping_gait,
// // //       physical_deformity: row.physical_deformity,
// // //       flat_foot: row.flat_foot,
// // //       mental_depression: row.mental_depression,
// // //       height_phobia: row.height_phobia,
// // //       height_phobia_image: row.height_phobia_image,
// // //       physical_deformity_image: row.physical_deformity_image,
// // //       sugar_level: row.sugar_level,
// // //       blood_group: row.blood_group,
// // //       pallor: row.pallor,
// // //       lymphadenopathy: row.lymphadenopathy,
// // //       icterus: row.icterus,
// // //       cyanosis: row.cyanosis,
// // //       edema: row.edema,
// // //       medical_history: row.medical_history,
// // //       other_health_info: row.other_health_info,
// // //       other_health_details: row.other_health_details,
// // //       final_conclusion: row.final_conclusion,
// // //       created_at: row.created_at,
// // //     }));

// // //     res.json(laborers);
// // //   } catch (err) {
// // //     console.error("❌ getAllPreEmployment failed:", err);
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // export const getPreEmploymentById = async (req, res) => {
// // //   const { id } = req.params;
// // //   if (!id) {
// // //     return res.status(400).json({ error: "ID is required" });
// // //   }

// // //   try {
// // //     const [rows] = await pool.query(queries.GET_LABORER_BY_ID, [id]);
// // //     if (rows.length === 0) {
// // //       return res.status(404).json({ error: "Laborer not found" });
// // //     }

// // //     const laborer = rows[0];
// // //     laborer.identification_mark1 = laborer.identification_mark1 ? JSON.parse(laborer.identification_mark1) : [];
// // //     laborer.identification_mark2 = laborer.identification_mark2 ? JSON.parse(laborer.identification_mark2) : [];

// // //     res.json(laborer);
// // //   } catch (err) {
// // //     console.error("❌ getPreEmploymentById failed:", err);
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // };

// // // export const updatePreEmployment = async (req, res) => {
// // //   const { id } = req.params;
// // //   if (!id) {
// // //     return res.status(400).json({ error: "ID is required" });
// // //   }

// // //   const { data: dataStr } = req.body || {};
// // //   const heightFile = req.files?.heightPhobiaImage?.[0];
// // //   const deformityFile = req.files?.physicalDeformityImage?.[0];

// // //   if (!dataStr) {
// // //     return res.status(400).json({ error: "No data provided" });
// // //   }

// // //   let laborerData;
// // //   try {
// // //     laborerData = JSON.parse(dataStr);
// // //   } catch (err) {
// // //     return res.status(400).json({ error: "Invalid data format" });
// // //   }

// // //   if (Array.isArray(laborerData)) {
// // //     return res.status(400).json({ error: "Update supports single laborer data" });
// // //   }

// // //   const connection = await pool.getConnection();
// // //   try {
// // //     await connection.beginTransaction();

// // //     // Ensure JSON strings for marks
// // //     const mark1 = typeof laborerData.identificationMark1 === "string"
// // //       ? laborerData.identificationMark1
// // //       : JSON.stringify(laborerData.identificationMark1 || []);
// // //     const mark2 = typeof laborerData.identificationMark2 === "string"
// // //       ? laborerData.identificationMark2
// // //       : JSON.stringify(laborerData.identificationMark2 || []);

// // //     const values = [
// // //       laborerData.name || "",
// // //       laborerData.certificateSerialNo || "",
// // //       laborerData.date ? new Date(laborerData.date) : null,
// // //       laborerData.parentage || "",
// // //       mark1,
// // //       mark2,
// // //       laborerData.sex || "",
// // //       laborerData.residence || "",
// // //       laborerData.dateOfBirth ? new Date(laborerData.dateOfBirth) : null,
// // //       laborerData.certificateAge ? parseInt(laborerData.certificateAge, 10) : null,
// // //       laborerData.reasonFor || "",
// // //       laborerData.height ? parseFloat(laborerData.height) : null,
// // //       laborerData.weight ? parseFloat(laborerData.weight) : null,
// // //       laborerData.bmi ? parseFloat(laborerData.bmi) : null,
// // //       laborerData.bodyTemp ? parseFloat(laborerData.bodyTemp) : null,
// // //       laborerData.nearVision || "",
// // //       laborerData.farVision || "",
// // //       laborerData.bp || "",
// // //       laborerData.pulse ? parseInt(laborerData.pulse, 10) : null,
// // //       laborerData.systemic || "",
// // //       laborerData.knownCaseOfEpilepsy || "",
// // //       laborerData.frequentHeadache || "",
// // //       laborerData.limpingGait || "",
// // //       laborerData.physicalDeformity || "",
// // //       laborerData.flatFoot || "",
// // //       laborerData.mentalDepression || "",
// // //       laborerData.heightPhobia || "",
// // //       heightFile ? heightFile.filename : null,
// // //       deformityFile ? deformityFile.filename : null,
// // //       laborerData.sugarLevel ? parseFloat(laborerData.sugarLevel) : null,
// // //       laborerData.bloodGroup || "",
// // //       laborerData.pallor || "No",
// // //       laborerData.lymphadenopathy || "No",
// // //       laborerData.icterus || "No",
// // //       laborerData.cyanosis || "No",
// // //       laborerData.edema || "No",
// // //       laborerData.medicalHistory || "",
// // //       laborerData.otherHealthInfo || "",
// // //       laborerData.otherHealthDetails || "",
// // //       laborerData.finalConclusion || "",
// // //       id
// // //     ];

// // //     const [result] = await connection.query(queries.UPDATE_LABORER, values);
// // //     if (result.affectedRows === 0) {
// // //       throw new Error("No laborer found to update");
// // //     }

// // //     await connection.commit();
// // //     res.json({ message: "Laborer updated successfully" });
// // //   } catch (err) {
// // //     await connection.rollback();
// // //     console.error("❌ updatePreEmployment failed:", err);
// // //     res.status(500).json({ error: err.message });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // };

// // // export const deletePreEmployment = async (req, res) => {
// // //   const { id } = req.params;
// // //   if (!id) {
// // //     return res.status(400).json({ error: "ID is required" });
// // //   }

// // //   const connection = await pool.getConnection();
// // //   try {
// // //     await connection.beginTransaction();

// // //     const [result] = await connection.query(queries.DELETE_LABORER, [id]);
// // //     if (result.affectedRows === 0) {
// // //       throw new Error("No laborer found to delete");
// // //     }

// // //     await connection.commit();
// // //     res.json({ message: "Laborer deleted successfully" });
// // //   } catch (err) {
// // //     await connection.rollback();
// // //     console.error("❌ deletePreEmployment failed:", err);
// // //     res.status(500).json({ error: err.message });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // };

// // // src/handlers/nursePreEmploymentHandler.js (Updated with date formatting and cookie name matching frontend)

// // import pool from "../config/db.js";
// // import * as queries from "../constants/nursePreEmploymentQuery.js";  // Adjusted import to match file name if needed

// // // Helper function to format date to YYYY-MM-DD
// // const formatDate = (dateStr) => {
// //   if (!dateStr) return null;
// //   const date = new Date(dateStr);
// //   if (isNaN(date.getTime())) return null;
// //   return date.toISOString().split('T')[0];  // Returns YYYY-MM-DD
// // };

// // export const addPreEmployment = async (req, res) => {
// //   const { data: dataStr } = req.body || {};
// //   const heightFiles = req.files?.heightPhobiaImage || [];
// //   const deformityFiles = req.files?.physicalDeformityImage || [];
// //   if (!dataStr) {
// //     return res.status(400).json({ error: "No data provided" });
// //   }
// //   let laborersData;
// //   try {
// //     laborersData = JSON.parse(dataStr);
// //   } catch (err) {
// //     return res.status(400).json({ error: "Invalid data format" });
// //   }
// //   if (!Array.isArray(laborersData) || laborersData.length === 0 || laborersData.length > 10) {
// //     return res.status(400).json({ error: "Must provide 1-10 laborers" });
// //   }
// //   if (heightFiles.length > laborersData.length || deformityFiles.length > laborersData.length) {
// //     return res.status(400).json({ error: "Too many files uploaded" });
// //   }
// //   const createdBy = req.user?.username || "admin";
// //   // Match frontend cookie names: "siteId" and "userId"
// //   const siteId = req.cookies?.siteId || null;
// // const userId = req.cookies?.userId || null;

// //   const connection = await pool.getConnection();
// //   try {
// //     await connection.beginTransaction();
// //     // Generate starting ID number
// //     const [lastRecord] = await connection.query(`
// //       SELECT laborer_id FROM nurse_pre_employment WHERE laborer_id LIKE 'LAB-PRE-%'
// //       ORDER BY CAST(SUBSTRING(laborer_id, 9) AS UNSIGNED) DESC LIMIT 1
// //     `);
// //     let newIdNumber = 1;
// //     if (lastRecord.length > 0 && lastRecord[0].laborer_id) {
// //       const lastNumber = parseInt(lastRecord[0].laborer_id.split("-")[2], 10);
// //       if (!isNaN(lastNumber)) newIdNumber = lastNumber + 1;
// //     }
// //     const newLaborerIds = [];
// //     let insertedCount = 0;
// //     for (let i = 0; i < laborersData.length; i++) {
// //       const laborer = laborersData[i];
// //       if (!laborer.name || !laborer.name.trim()) {
// //         continue; // Skip unfilled
// //       }
// //       const idNum = newIdNumber + insertedCount;
// //       const newLaborerId = `LAB-PRE-${idNum.toString().padStart(4, "0")}`;
// //       newLaborerIds.push(newLaborerId);
// //       // Ensure JSON strings for marks
// //       const mark1 = typeof laborer.identificationMark1 === "string"
// //         ? laborer.identificationMark1
// //         : JSON.stringify(laborer.identificationMark1 || []);
// //       const mark2 = typeof laborer.identificationMark2 === "string"
// //         ? laborer.identificationMark2
// //         : JSON.stringify(laborer.identificationMark2 || []);
// //       const values = [
// //         newLaborerId,
// //         createdBy,
// //         laborer.name || "",
// //         laborer.certificateSerialNo || "",
// //         formatDate(laborer.date),  // ✅ Formatted date
// //         laborer.parentage || "",
// //         mark1,
// //         mark2,
// //         laborer.sex || "",
// //         laborer.residence || "",
// //         formatDate(laborer.dateOfBirth),  // ✅ Formatted date
// //         laborer.certificateAge ? parseInt(laborer.certificateAge, 10) : null,
// //         laborer.reasonFor || "",
// //         laborer.height ? parseFloat(laborer.height) : null,
// //         laborer.weight ? parseFloat(laborer.weight) : null,
// //         laborer.bmi ? parseFloat(laborer.bmi) : null,
// //         laborer.bodyTemp ? parseFloat(laborer.bodyTemp) : null,
// //         laborer.nearVision || "",
// //         laborer.farVision || "",
// //         laborer.bp || "",
// //         laborer.pulse ? parseInt(laborer.pulse, 10) : null,
// //         laborer.systemic || "",
// //         laborer.knownCaseOfEpilepsy || "",
// //         laborer.frequentHeadache || "",
// //         laborer.limpingGait || "",
// //         laborer.physicalDeformity || "",
// //         laborer.flatFoot || "",
// //         laborer.mentalDepression || "",
// //         laborer.heightPhobia || "",
// //         heightFiles[insertedCount] ? heightFiles[insertedCount].filename : null,
// //         deformityFiles[insertedCount] ? deformityFiles[insertedCount].filename : null,
// //         laborer.sugarLevel ? parseFloat(laborer.sugarLevel) : null,
// //         laborer.bloodGroup || "",
// //         laborer.pallor || "No",
// //         laborer.lymphadenopathy || "No",
// //         laborer.icterus || "No",
// //         laborer.cyanosis || "No",
// //         laborer.edema || "No",
// //         laborer.medicalHistory || "",
// //         laborer.otherHealthInfo || "",
// //         laborer.otherHealthDetails || "",
// //         laborer.finalConclusion || "",
// //         siteId,  // ✅ From cookie "siteId"
// //         userId   // ✅ From cookie "userId"
// //       ];
// //       // Debug: Log array length
// //       console.log(`Values array length: ${values.length} (should be 44)`);
// //       console.log('Last two values (siteId, userId):', siteId, userId);
// //       const [result] = await connection.query(queries.INSERT_LABORER, values);
// //       if (result.affectedRows === 0) {
// //         throw new Error(`Failed to insert laborer ${insertedCount + 1}`);
// //       }
// //       insertedCount++;
// //     }
// //     if (insertedCount === 0) {
// //       throw new Error("No valid laborers to insert");
// //     }
// //     await connection.commit();
// //     res.json({ message: `${insertedCount} laborers added successfully`, laborer_ids: newLaborerIds });
// //   } catch (err) {
// //     await connection.rollback();
// //     console.error("❌ addPreEmployment failed:", err);
// //     res.status(500).json({ error: err.message });
// //   } finally {
// //     connection.release();
// //   }
// // };

// // export const getAllPreEmployment = async (req, res) => {
// //   try {
// //     const [rows] = await pool.query(queries.GET_ALL_LABORERS);

// //     const laborers = rows.map((row) => ({
// //       id: row.id,
// //       laborer_id: row.laborer_id,
// //       created_by: row.created_by,
// //       name: row.name,
// //       certificate_serial_no: row.certificate_serial_no,
// //       date: row.date,
// //       parentage: row.parentage,
// //       identification_mark1: row.identification_mark1 ? JSON.parse(row.identification_mark1) : [],
// //       identification_mark2: row.identification_mark2 ? JSON.parse(row.identification_mark2) : [],
// //       sex: row.sex,
// //       residence: row.residence,
// //       date_of_birth: row.date_of_birth,
// //       certificate_age: row.certificate_age,
// //       reason_for: row.reason_for,
// //       height: row.height,
// //       weight: row.weight,
// //       bmi: row.bmi,
// //       body_temp: row.body_temp,
// //       near_vision: row.near_vision,
// //       far_vision: row.far_vision,
// //       bp: row.bp,
// //       pulse: row.pulse,
// //       systemic: row.systemic,
// //       known_case_of_epilepsy: row.known_case_of_epilepsy,
// //       frequent_headache: row.frequent_headache,
// //       limping_gait: row.limping_gait,
// //       physical_deformity: row.physical_deformity,
// //       flat_foot: row.flat_foot,
// //       mental_depression: row.mental_depression,
// //       height_phobia: row.height_phobia,
// //       height_phobia_image: row.height_phobia_image,
// //       physical_deformity_image: row.physical_deformity_image,
// //       sugar_level: row.sugar_level,
// //       blood_group: row.blood_group,
// //       pallor: row.pallor,
// //       lymphadenopathy: row.lymphadenopathy,
// //       icterus: row.icterus,
// //       cyanosis: row.cyanosis,
// //       edema: row.edema,
// //       medical_history: row.medical_history,
// //       other_health_info: row.other_health_info,
// //       other_health_details: row.other_health_details,
// //       final_conclusion: row.final_conclusion,
// //       status: row.status || 'pending',
// //       active: row.active || 'active',
// //       site_id: row.site_id,
// //       user_id: row.user_id,
// //       created_at: row.created_at,
// //     }));

// //     res.json(laborers);
// //   } catch (err) {
// //     console.error("❌ getAllPreEmployment failed:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // export const getPreEmploymentById = async (req, res) => {
// //   const { id } = req.params;
// //   if (!id) {
// //     return res.status(400).json({ error: "ID is required" });
// //   }

// //   try {
// //     const [rows] = await pool.query(queries.GET_LABORER_BY_ID, [id]);
// //     if (rows.length === 0) {
// //       return res.status(404).json({ error: "Laborer not found" });
// //     }

// //     const laborer = rows[0];
// //     laborer.identification_mark1 = laborer.identification_mark1 ? JSON.parse(laborer.identification_mark1) : [];
// //     laborer.identification_mark2 = laborer.identification_mark2 ? JSON.parse(laborer.identification_mark2) : [];
// //     laborer.status = laborer.status || 'pending';
// //     laborer.active = laborer.active || 'active';
// //     laborer.site_id = laborer.site_id;
// //     laborer.user_id = laborer.user_id;

// //     res.json(laborer);
// //   } catch (err) {
// //     console.error("❌ getPreEmploymentById failed:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // export const updatePreEmployment = async (req, res) => {
// //   const { id } = req.params;
// //   if (!id) {
// //     return res.status(400).json({ error: "ID is required" });
// //   }

// //   const { data: dataStr } = req.body || {};
// //   const heightFile = req.files?.heightPhobiaImage?.[0];
// //   const deformityFile = req.files?.physicalDeformityImage?.[0];

// //   if (!dataStr) {
// //     return res.status(400).json({ error: "No data provided" });
// //   }

// //   let laborerData;
// //   try {
// //     laborerData = JSON.parse(dataStr);
// //   } catch (err) {
// //     return res.status(400).json({ error: "Invalid data format" });
// //   }

// //   if (Array.isArray(laborerData)) {
// //     return res.status(400).json({ error: "Update supports single laborer data" });
// //   }

// //   // Match frontend cookie names
// //   const siteId = req.cookies?.siteId || null;
// //   const userId = req.cookies?.userId || null;

// //   const connection = await pool.getConnection();
// //   try {
// //     await connection.beginTransaction();

// //     // Ensure JSON strings for marks
// //     const mark1 = typeof laborerData.identificationMark1 === "string"
// //       ? laborerData.identificationMark1
// //       : JSON.stringify(laborerData.identificationMark1 || []);
// //     const mark2 = typeof laborerData.identificationMark2 === "string"
// //       ? laborerData.identificationMark2
// //       : JSON.stringify(laborerData.identificationMark2 || []);

// //     const values = [
// //   newLaborerId,
// //   createdBy,
// //   laborer.name || "",
// //   laborer.certificateSerialNo || "",
// //   formatDate(laborer.date),
// //   laborer.parentage || "",
// //   mark1,
// //   mark2,
// //   laborer.sex || "",
// //   laborer.residence || "",
// //   formatDate(laborer.dateOfBirth),
// //   laborer.certificateAge ? parseInt(laborer.certificateAge, 10) : null,
// //   laborer.reasonFor || "",
// //   laborer.height ? parseFloat(laborer.height) : null,
// //   laborer.weight ? parseFloat(laborer.weight) : null,
// //   laborer.bmi ? parseFloat(laborer.bmi) : null,
// //   laborer.bodyTemp ? parseFloat(laborer.bodyTemp) : null,
// //   laborer.nearVision || "",
// //   laborer.farVision || "",
// //   laborer.bp || "",
// //   laborer.pulse ? parseInt(laborer.pulse, 10) : null,
// //   laborer.systemic || "",
// //   laborer.knownCaseOfEpilepsy || "",
// //   laborer.frequentHeadache || "",
// //   laborer.limpingGait || "",
// //   laborer.physicalDeformity || "",
// //   laborer.flatFoot || "",
// //   laborer.mentalDepression || "",
// //   laborer.heightPhobia || "",
// //   heightFiles[insertedCount] ? heightFiles[insertedCount].filename : null,
// //   deformityFiles[insertedCount] ? deformityFiles[insertedCount].filename : null,
// //   laborer.sugarLevel ? parseFloat(laborer.sugarLevel) : null,
// //   laborer.bloodGroup || "",
// //   laborer.pallor || "No",
// //   laborer.lymphadenopathy || "No",
// //   laborer.icterus || "No",
// //   laborer.cyanosis || "No",
// //   laborer.edema || "No",
// //   laborer.medicalHistory || "",
// //   laborer.otherHealthInfo || "",
// //   laborer.otherHealthDetails || "",
// //   laborer.finalConclusion || "",
// //   siteId, // ✅ from cookie
// //   userId  // ✅ from cookie
// // ];

// //     // Debug: Log array length for update
// //     console.log(`Update values array length: ${values.length} (should be 45)`);

// //     const [result] = await connection.query(queries.UPDATE_LABORER, values);
// //     if (result.affectedRows === 0) {
// //       throw new Error("No laborer found to update");
// //     }

// //     await connection.commit();
// //     res.json({ message: "Laborer updated successfully" });
// //   } catch (err) {
// //     await connection.rollback();
// //     console.error("❌ updatePreEmployment failed:", err);
// //     res.status(500).json({ error: err.message });
// //   } finally {
// //     connection.release();
// //   }
// // };

// // export const deletePreEmployment = async (req, res) => {
// //   const { id } = req.params;
// //   if (!id) {
// //     return res.status(400).json({ error: "ID is required" });
// //   }

// //   const connection = await pool.getConnection();
// //   try {
// //     await connection.beginTransaction();

// //     const [result] = await connection.query(queries.DELETE_LABORER, [id]);
// //     if (result.affectedRows === 0) {
// //       throw new Error("No laborer found to delete");
// //     }

// //     await connection.commit();
// //     res.json({ message: "Laborer deleted successfully" });
// //   } catch (err) {
// //     await connection.rollback();
// //     console.error("❌ deletePreEmployment failed:", err);
// //     res.status(500).json({ error: err.message });
// //   } finally {
// //     connection.release();
// //   }
// // };
// // Add this to the end of nursePreEmploymentHandle.js (CommonJS style)

// const PDFDocument = require('pdfkit');

// const generatePDF = async (req, res) => {
//   const { id } = req.params;
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     // Fetch the laborer data using the existing handler
//     const laborer = await getPreEmploymentById({ params: { id } }, { json: () => {} }); // Mock res for handler
//     if (!laborer) {
//       return res.status(404).json({ error: "Laborer not found" });
//     }

//     // Create PDF
//     const doc = new PDFDocument();
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=laborer_${id}.pdf`);
//     doc.pipe(res);

//     // Add title
//     doc.fontSize(20).text('Pre-Employment Medical Report', { align: 'center' });
//     doc.moveDown();

//     // Add laborer details
//     doc.fontSize(12).text(`Name: ${laborer.name || 'N/A'}`);
//     doc.text(`Laborer ID: ${laborer.laborer_id || 'N/A'}`);
//     doc.text(`Date of Birth: ${laborer.date_of_birth || 'N/A'}`);
//     doc.text(`Sex: ${laborer.sex || 'N/A'}`);
//     doc.text(`Height: ${laborer.height || 'N/A'} cm`);
//     doc.text(`Weight: ${laborer.weight || 'N/A'} kg`);
//     doc.text(`BMI: ${laborer.bmi || 'N/A'}`);
//     doc.text(`Blood Group: ${laborer.blood_group || 'N/A'}`);
//     doc.text(`Final Conclusion: ${laborer.final_conclusion || 'N/A'}`);

//     // Add more details as needed
//     doc.moveDown(2);
//     doc.text('Full Medical History:', { underline: true });
//     doc.text(`Systemic: ${laborer.systemic || 'N/A'}`);
//     doc.text(`Known Case of Epilepsy: ${laborer.known_case_of_epilepsy || 'N/A'}`);
//     doc.text(`Frequent Headache: ${laborer.frequent_headache || 'N/A'}`);
//     doc.text(`Limping Gait: ${laborer.limping_gait || 'N/A'}`);
//     doc.text(`Physical Deformity: ${laborer.physical_deformity || 'N/A'}`);
//     doc.text(`Flat Foot: ${laborer.flat_foot || 'N/A'}`);
//     doc.text(`Mental Depression: ${laborer.mental_depression || 'N/A'}`);
//     doc.text(`Height Phobia: ${laborer.height_phobia || 'N/A'}`);
//     doc.text(`Sugar Level: ${laborer.sugar_level || 'N/A'}`);
//     doc.text(`Medical History: ${laborer.medical_history || 'N/A'}`);
//     doc.text(`Other Health Info: ${laborer.other_health_info || 'N/A'}`);

//     // Identification marks
//     doc.moveDown();
//     doc.text('Identification Marks:', { underline: true });
//     doc.text(`Mark 1: ${Array.isArray(laborer.identification_mark1) ? laborer.identification_mark1.join(', ') : laborer.identification_mark1 || 'N/A'}`);
//     doc.text(`Mark 2: ${Array.isArray(laborer.identification_mark2) ? laborer.identification_mark2.join(', ') : laborer.identification_mark2 || 'N/A'}`);

//     // P/O/L/I/C/E
//     doc.moveDown();
//     doc.text('P/O/L/I/C/E:', { underline: true });
//     doc.text(`Pallor: ${laborer.pallor || 'No'}`);
//     doc.text(`Lymphadenopathy: ${laborer.lymphadenopathy || 'No'}`);
//     doc.text(`Icterus: ${laborer.icterus || 'No'}`);
//     doc.text(`Cyanosis: ${laborer.cyanosis || 'No'}`);
//     doc.text(`Edema: ${laborer.edema || 'No'}`);

//     doc.end();
//   } catch (error) {
//     console.error("PDF generation failed:", error);
//     res.status(500).json({ error: "Failed to generate PDF" });
//   }
// };

// module.exports = {
//   addPreEmployment,
//   getAllPreEmployment,
//   getPreEmploymentById,
//   updatePreEmployment,
//   deletePreEmployment,
//   generatePDF
// };
import pool from "../config/db.js";
import * as queries from "../constants/nursePreEmploymentQuery.js";  // Adjusted import to match file name if needed

// Helper function to format date to YYYY-MM-DD
const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  return date.toISOString().split('T')[0];  // Returns YYYY-MM-DD
};
const safeParseJSON = (value) => {
  if (!value) return [];
  try {
    // If it’s a valid JSON string, parse it
    return JSON.parse(value);
  } catch (err) {
    // If not valid JSON, wrap it in an array
    return [value];
  }
};

export const addPreEmployment = async (req, res) => {
  const { data: dataStr } = req.body || {};
  const heightFiles = req.files?.heightPhobiaImage || [];
  const deformityFiles = req.files?.physicalDeformityImage || [];
  if (!dataStr) {
    return res.status(400).json({ error: "No data provided" });
  }
  let laborersData;
  try {
    laborersData = JSON.parse(dataStr);
  } catch (err) {
    return res.status(400).json({ error: "Invalid data format" });
  }
  if (!Array.isArray(laborersData) || laborersData.length === 0 || laborersData.length > 10) {
    return res.status(400).json({ error: "Must provide 1-10 laborers" });
  }
  if (heightFiles.length > laborersData.length || deformityFiles.length > laborersData.length) {
    return res.status(400).json({ error: "Too many files uploaded" });
  }
  const createdBy = req.user?.username || "admin";
  // Match frontend cookie names: "siteId" and "userId"
  const siteId = req.cookies?.siteId || null;
  const userId = req.cookies?.userId || null;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    // Generate starting ID number
    const [lastRecord] = await connection.query(`
      SELECT laborer_id FROM nurse_pre_employment WHERE laborer_id LIKE 'LAB-PRE-%'
      ORDER BY CAST(SUBSTRING(laborer_id, 9) AS UNSIGNED) DESC LIMIT 1
    `);
    let newIdNumber = 1;
    if (lastRecord.length > 0 && lastRecord[0].laborer_id) {
      const lastNumber = parseInt(lastRecord[0].laborer_id.split("-")[2], 10);
      if (!isNaN(lastNumber)) newIdNumber = lastNumber + 1;
    }
    const newLaborerIds = [];
    let insertedCount = 0;
    for (let i = 0; i < laborersData.length; i++) {
      const laborer = laborersData[i];
      if (!laborer.name || !laborer.name.trim()) {
        continue; // Skip unfilled
      }
      const idNum = newIdNumber + insertedCount;
      const newLaborerId = `LAB-PRE-${idNum.toString().padStart(4, "0")}`;
      newLaborerIds.push(newLaborerId);
      // Ensure JSON strings for marks
      const mark1 = typeof laborer.identificationMark1 === "string"
        ? laborer.identificationMark1
        : JSON.stringify(laborer.identificationMark1 || []);
      const mark2 = typeof laborer.identificationMark2 === "string"
        ? laborer.identificationMark2
        : JSON.stringify(laborer.identificationMark2 || []);
      const values = [
        newLaborerId,
        createdBy,
        laborer.name || "",
        laborer.certificateSerialNo || "",
        formatDate(laborer.date),  // ✅ Formatted date
        laborer.parentage || "",
        mark1,
        mark2,
        laborer.sex || "",
        laborer.residence || "",
        formatDate(laborer.dateOfBirth),  // ✅ Formatted date
        laborer.certificateAge ? parseInt(laborer.certificateAge, 10) : null,
        laborer.reasonFor || "",
        laborer.height ? parseFloat(laborer.height) : null,
        laborer.weight ? parseFloat(laborer.weight) : null,
        laborer.bmi ? parseFloat(laborer.bmi) : null,
        laborer.bodyTemp ? parseFloat(laborer.bodyTemp) : null,
        laborer.nearVision || "",
        laborer.farVision || "",
        laborer.bp || "",
        laborer.pulse ? parseInt(laborer.pulse, 10) : null,
        laborer.systemic || "",
        laborer.knownCaseOfEpilepsy || "",
        laborer.frequentHeadache || "",
        laborer.limpingGait || "",
        laborer.physicalDeformity || "",
        laborer.flatFoot || "",
        laborer.mentalDepression || "",
        laborer.heightPhobia || "",
        heightFiles[insertedCount] ? heightFiles[insertedCount].filename : null,
        deformityFiles[insertedCount] ? deformityFiles[insertedCount].filename : null,
        laborer.sugarLevel ? parseFloat(laborer.sugarLevel) : null,
        laborer.bloodGroup || "",
        laborer.pallor || "No",
        laborer.lymphadenopathy || "No",
        laborer.icterus || "No",
        laborer.cyanosis || "No",
        laborer.edema || "No",
        laborer.medicalHistory || "",
        laborer.otherHealthInfo || "",
        laborer.otherHealthDetails || "",
        laborer.finalConclusion || "",
        siteId,  // ✅ From cookie "siteId"
        userId   // ✅ From cookie "userId"
      ];
      // Debug: Log array length
      console.log(`Values array length: ${values.length} (should be 44)`);
      console.log('Last two values (siteId, userId):', siteId, userId);
      const [result] = await connection.query(queries.INSERT_LABORER, values);
      if (result.affectedRows === 0) {
        throw new Error(`Failed to insert laborer ${insertedCount + 1}`);
      }
      insertedCount++;
    }
    if (insertedCount === 0) {
      throw new Error("No valid laborers to insert");
    }
    await connection.commit();
    res.json({ message: `${insertedCount} laborers added successfully`, laborer_ids: newLaborerIds });
  } catch (err) {
    await connection.rollback();
    console.error("❌ addPreEmployment failed:", err);
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};

export const getAllPreEmployment = async (req, res) => {
  try {
    const [rows] = await pool.query(queries.GET_ALL_LABORERS);

    const laborers = rows.map((row) => ({
      id: row.id,
      laborer_id: row.laborer_id,
      created_by: row.created_by,
      name: row.name,
      certificate_serial_no: row.certificate_serial_no,
      date: row.date,
      parentage: row.parentage,
     identification_mark1: safeParseJSON(row.identification_mark1),
identification_mark2: safeParseJSON(row.identification_mark2),

      residence: row.residence,
      date_of_birth: row.date_of_birth,
      certificate_age: row.certificate_age,
      reason_for: row.reason_for,
      height: row.height,
      weight: row.weight,
      bmi: row.bmi,
      body_temp: row.body_temp,
      near_vision: row.near_vision,
      far_vision: row.far_vision,
      bp: row.bp,
      pulse: row.pulse,
      systemic: row.systemic,
      known_case_of_epilepsy: row.known_case_of_epilepsy,
      frequent_headache: row.frequent_headache,
      limping_gait: row.limping_gait,
      physical_deformity: row.physical_deformity,
      flat_foot: row.flat_foot,
      mental_depression: row.mental_depression,
      height_phobia: row.height_phobia,
      height_phobia_image: row.height_phobia_image,
      physical_deformity_image: row.physical_deformity_image,
      sugar_level: row.sugar_level,
      blood_group: row.blood_group,
      pallor: row.pallor,
      lymphadenopathy: row.lymphadenopathy,
      icterus: row.icterus,
      cyanosis: row.cyanosis,
      edema: row.edema,
      medical_history: row.medical_history,
      other_health_info: row.other_health_info,
      other_health_details: row.other_health_details,
      final_conclusion: row.final_conclusion,
      status: row.status || 'pending',
      active: row.active || 'active',
      site_id: row.site_id,
      user_id: row.user_id,
      created_at: row.created_at,
    }));

    res.json(laborers);
  } catch (err) {
    console.error("❌ getAllPreEmployment failed:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getPreEmploymentById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const [rows] = await pool.query(queries.GET_LABORER_BY_ID, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Laborer not found" });
    }

    const laborer = rows[0];
    laborer.identification_mark1 = laborer.identification_mark1 ? JSON.parse(laborer.identification_mark1) : [];
    laborer.identification_mark2 = laborer.identification_mark2 ? JSON.parse(laborer.identification_mark2) : [];
    laborer.status = laborer.status || 'pending';
    laborer.active = laborer.active || 'active';
    laborer.site_id = laborer.site_id;
    laborer.user_id = laborer.user_id;

    res.json(laborer);
  } catch (err) {
    console.error("❌ getPreEmploymentById failed:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updatePreEmployment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const { data: dataStr } = req.body || {};
  const heightFile = req.files?.heightPhobiaImage?.[0];
  const deformityFile = req.files?.physicalDeformityImage?.[0];

  if (!dataStr) {
    return res.status(400).json({ error: "No data provided" });
  }

  let laborerData;
  try {
    laborerData = JSON.parse(dataStr);
  } catch (err) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  if (Array.isArray(laborerData)) {
    return res.status(400).json({ error: "Update supports single laborer data" });
  }

  // Match frontend cookie names
  const siteId = req.cookies?.siteId || null;
  const userId = req.cookies?.userId || null;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Ensure JSON strings for marks
    const mark1 = typeof laborerData.identificationMark1 === "string"
      ? laborerData.identificationMark1
      : JSON.stringify(laborerData.identificationMark1 || []);
    const mark2 = typeof laborerData.identificationMark2 === "string"
      ? laborerData.identificationMark2
      : JSON.stringify(laborerData.identificationMark2 || []);

    const values = [
      laborerData.name || "",
      laborerData.certificateSerialNo || "",
      formatDate(laborerData.date),
      laborerData.parentage || "",
      mark1,
      mark2,
      laborerData.sex || "",
      laborerData.residence || "",
      formatDate(laborerData.dateOfBirth),
      laborerData.certificateAge ? parseInt(laborerData.certificateAge, 10) : null,
      laborerData.reasonFor || "",
      laborerData.height ? parseFloat(laborerData.height) : null,
      laborerData.weight ? parseFloat(laborerData.weight) : null,
      laborerData.bmi ? parseFloat(laborerData.bmi) : null,
      laborerData.bodyTemp ? parseFloat(laborerData.bodyTemp) : null,
      laborerData.nearVision || "",
      laborerData.farVision || "",
      laborerData.bp || "",
      laborerData.pulse ? parseInt(laborerData.pulse, 10) : null,
      laborerData.systemic || "",
      laborerData.knownCaseOfEpilepsy || "",
      laborerData.frequentHeadache || "",
      laborerData.limpingGait || "",
      laborerData.physicalDeformity || "",
      laborerData.flatFoot || "",
      laborerData.mentalDepression || "",
      laborerData.heightPhobia || "",
      heightFile ? heightFile.filename : null,
      deformityFile ? deformityFile.filename : null,
      laborerData.sugarLevel ? parseFloat(laborerData.sugarLevel) : null,
      laborerData.bloodGroup || "",
      laborerData.pallor || "No",
      laborerData.lymphadenopathy || "No",
      laborerData.icterus || "No",
      laborerData.cyanosis || "No",
      laborerData.edema || "No",
      laborerData.medicalHistory || "",
      laborerData.otherHealthInfo || "",
      laborerData.otherHealthDetails || "",
      laborerData.finalConclusion || "",
      siteId, // ✅ from cookie
      userId, // ✅ from cookie
      id // WHERE id = ?
    ];

    // Debug: Log array length for update
    console.log(`Update values array length: ${values.length} (should be 43)`);

    const [result] = await connection.query(queries.UPDATE_LABORER, values);
    if (result.affectedRows === 0) {
      throw new Error("No laborer found to update");
    }

    await connection.commit();
    res.json({ message: "Laborer updated successfully" });
  } catch (err) {
    await connection.rollback();
    console.error("❌ updatePreEmployment failed:", err);
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};

export const deletePreEmployment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(queries.DELETE_LABORER, [id]);
    if (result.affectedRows === 0) {
      throw new Error("No laborer found to delete");
    }

    await connection.commit();
    res.json({ message: "Laborer deleted successfully" });
  } catch (err) {
    await connection.rollback();
    console.error("❌ deletePreEmployment failed:", err);
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};