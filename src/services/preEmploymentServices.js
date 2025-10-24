const db = require("../config/db");
const { GET_NURSE_RECORDS_BY_SITE, UPDATE_NURSE_RECORD } = require("../constants/preEmploymentQueries");

const getNurseRecordsBySiteService = async (site_id) => {
  try {
    const [rows] = await db.query(GET_NURSE_RECORDS_BY_SITE, [site_id]);
    return rows;
  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
};

const updateNurseRecordService = async (id, recordData) => {
  try {
    const values = [
      recordData.laborer_id,
      recordData.created_by,
      recordData.name,
      recordData.certificate_serial_no,
      recordData.date,
      recordData.parentage,
      JSON.stringify(recordData.identification_mark1),
      JSON.stringify(recordData.identification_mark2),
      recordData.sex,
      recordData.residence,
      recordData.date_of_birth,
      recordData.certificate_age,
      recordData.reason_for,
      recordData.height,
      recordData.weight,
      recordData.bmi,
      recordData.body_temp,
      recordData.near_vision,
      recordData.far_vision,
      recordData.bp,
      recordData.pulse,
      recordData.systemic,
      recordData.known_case_of_epilepsy,
      recordData.frequent_headache,
      recordData.limping_gait,
      recordData.physical_deformity,
      recordData.flat_foot,
      recordData.mental_depression,
      recordData.height_phobia,
      recordData.height_phobia_image,
      recordData.physical_deformity_image,
      recordData.sugar_level,
      recordData.blood_group,
      recordData.pallor,
      recordData.lymphadenopathy,
      recordData.icterus,
      recordData.cyanosis,
      recordData.edema,
      recordData.medical_history,
      recordData.other_health_info,
      recordData.other_health_details,
      recordData.final_conclusion,
      recordData.status,
      recordData.active,
      recordData.site_id,
      recordData.user_id,
      id
    ];

    const [result] = await db.query(UPDATE_NURSE_RECORD, values);
    return result;
  } catch (error) {
    console.error("Update Service Error:", error);
    throw error;
  }
};

module.exports = {
  getNurseRecordsBySiteService,
  updateNurseRecordService
};
