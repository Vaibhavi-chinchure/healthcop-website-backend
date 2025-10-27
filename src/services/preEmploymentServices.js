// import db from "../config/db.js";
// import { GET_NURSE_RECORDS_BY_SITE, UPDATE_NURSE_RECORD } from "../constants/preEmploymentQueries.js";

// const getNurseRecordsBySiteService = async (site_id) => {
//   try {
//     const [rows] = await db.query(GET_NURSE_RECORDS_BY_SITE, [site_id]);
//     return rows;
//   } catch (error) {
//     console.error("Service Error:", error);
//     throw error;
//   }
// };

// // Update record service
// const updateNurseRecordService = async (id, recordData) => {
//   try {
//     const values = [
//       recordData.laborer_id,
//       recordData.created_by,
//       recordData.name,
//       recordData.certificate_serial_no,
//       recordData.date,
//       recordData.parentage,
//       JSON.stringify(recordData.identification_mark1),
//       JSON.stringify(recordData.identification_mark2),
//       recordData.sex,
//       recordData.residence,
//       recordData.date_of_birth,
//       recordData.certificate_age,
//       recordData.reason_for,
//       recordData.height,
//       recordData.weight,
//       recordData.bmi,
//       recordData.body_temp,
//       recordData.near_vision,
//       recordData.far_vision,
//       recordData.bp,
//       recordData.pulse,
//       recordData.systemic,
//       recordData.known_case_of_epilepsy,
//       recordData.frequent_headache,
//       recordData.limping_gait,
//       recordData.physical_deformity,
//       recordData.flat_foot,
//       recordData.mental_depression,
//       recordData.height_phobia,
//       recordData.height_phobia_image,
//       recordData.physical_deformity_image,
//       recordData.sugar_level,
//       recordData.blood_group,
//       recordData.pallor,
//       recordData.lymphadenopathy,
//       recordData.icterus,
//       recordData.cyanosis,
//       recordData.edema,
//       recordData.medical_history,
//       recordData.other_health_info,
//       recordData.other_health_details,
//       recordData.final_conclusion,
//       recordData.status,
//       recordData.active,
//       recordData.site_id,
//       recordData.user_id,
//       id
//     ];

//     const [result] = await db.query(UPDATE_NURSE_RECORD, values);
//     return result;
//   } catch (error) {
//     console.error("Update Service Error:", error);
//     throw error;
//   }
// };

// export { getNurseRecordsBySiteService, updateNurseRecordService };

import db from "../config/db.js";
import { GET_NURSE_RECORDS_BY_SITE, UPDATE_NURSE_RECORD } from "../constants/preEmploymentQueries.js";

const getNurseRecordsBySiteService = async (site_id) => {
  try {
    const [rows] = await db.query(GET_NURSE_RECORDS_BY_SITE, [site_id]);
    return rows;
  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
};

// Update record service
const updateNurseRecordService = async (id, recordData) => {
  try {
    if (!recordData || Object.keys(recordData).length === 0) {
      throw new Error("No data provided to update");
    }

    // Dynamically build the SET clause based on provided fields
    const fields = [];
    const values = [];
    const allowedFields = [
      "laborer_id",
      "created_by",
      "name",
      "certificate_serial_no",
      "date",
      "parentage",
      "identification_mark1",
      "identification_mark2",
      "sex",
      "residence",
      "date_of_birth",
      "certificate_age",
      "reason_for",
      "height",
      "weight",
      "bmi",
      "body_temp",
      "near_vision",
      "far_vision",
      "bp",
      "pulse",
      "systemic",
      "known_case_of_epilepsy",
      "frequent_headache",
      "limping_gait",
      "physical_deformity",
      "flat_foot",
      "mental_depression",
      "height_phobia",
      "height_phobia_image",
      "physical_deformity_image",
      "sugar_level",
      "blood_group",
      "pallor",
      "lymphadenopathy",
      "icterus",
      "cyanosis",
      "edema",
      "medical_history",
      "other_health_info",
      "other_health_details",
      "final_conclusion",
      "status",
      "active",
      "site_id",
      "user_id",
    ];

    for (const key of allowedFields) {
      if (recordData[key] !== undefined) {
        fields.push(`${key} = ?`);
        // Handle JSON fields
        if (["identification_mark1", "identification_mark2"].includes(key)) {
          values.push(JSON.stringify(recordData[key]));
        } else {
          values.push(recordData[key]);
        }
      }
    }

    if (fields.length === 0) {
      throw new Error("No valid fields provided to update");
    }

    // Construct the dynamic query
    const query = `
      UPDATE healthcop.nurse_pre_employment
      SET ${fields.join(", ")}
      WHERE id = ?
    `;
    values.push(id);

    const [result] = await db.query(query, values);
    if (result.affectedRows === 0) {
      throw new Error("Record not found or no changes made");
    }
    return { message: "Record updated successfully", affectedRows: result.affectedRows };
  } catch (error) {
    console.error("Update Service Error:", {
      message: error.message,
      sqlMessage: error.sqlMessage,
      sql: error.sql,
    });
    throw error;
  }
};

export { getNurseRecordsBySiteService, updateNurseRecordService };