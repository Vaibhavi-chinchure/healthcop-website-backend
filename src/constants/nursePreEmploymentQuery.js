// constants/nurseQueries.js

export const INSERT_LABORER = `

INSERT INTO nurse_pre_employment (
  laborer_id, created_by, name, certificate_serial_no, date, parentage,
  identification_mark1, identification_mark2, sex, residence,
  date_of_birth, certificate_age, reason_for, height, weight, bmi, body_temp,
  near_vision, far_vision, bp, pulse, systemic,
  known_case_of_epilepsy, frequent_headache, limping_gait,
  physical_deformity, flat_foot, mental_depression, height_phobia,
  height_phobia_image, physical_deformity_image, sugar_level, blood_group,
  pallor, lymphadenopathy, icterus, cyanosis, edema,
  medical_history, other_health_info, other_health_details, final_conclusion
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
export const GET_ALL_LABORERS = `
SELECT * FROM nurse_pre_employment ORDER BY created_at DESC
`;

export const GET_LABORER_BY_ID = `
SELECT * FROM nurse_pre_employment WHERE id = ?
`;

export const UPDATE_LABORER = `
UPDATE nurse_pre_employment 
SET 
  name = ?, certificate_serial_no = ?, date = ?, parentage = ?, 
  identification_mark1 = ?, identification_mark2 = ?, sex = ?, residence = ?,
  date_of_birth = ?, certificate_age = ?, reason_for = ?, height = ?, weight = ?, bmi = ?, body_temp = ?,
  near_vision = ?, far_vision = ?, bp = ?, pulse = ?, systemic = ?,
  known_case_of_epilepsy = ?, frequent_headache = ?, limping_gait = ?,
  physical_deformity = ?, flat_foot = ?, mental_depression = ?, height_phobia = ?,
  height_phobia_image = ?, physical_deformity_image = ?, sugar_level = ?, blood_group = ?, 
  pallor = ?, lymphadenopathy = ?, icterus = ?, cyanosis = ?, edema = ?,
  medical_history = ?, other_health_info = ?, other_health_details = ?, final_conclusion = ?
WHERE id = ?
`;

export const DELETE_LABORER = `
DELETE FROM nurse_pre_employment WHERE id = ?
`;