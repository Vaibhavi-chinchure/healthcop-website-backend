const GET_NURSE_RECORDS_BY_SITE = `
  SELECT * FROM healthcop.nurse_pre_employment WHERE site_id = ?;
`;

const UPDATE_NURSE_RECORD = `
  UPDATE healthcop.nurse_pre_employment
  SET
    laborer_id = ?,
    created_by = ?,
    name = ?,
    certificate_serial_no = ?,
    date = ?,
    parentage = ?,
    identification_mark1 = ?,
    identification_mark2 = ?,
    sex = ?,
    residence = ?,
    date_of_birth = ?,
    certificate_age = ?,
    reason_for = ?,
    height = ?,
    weight = ?,
    bmi = ?,
    body_temp = ?,
    near_vision = ?,
    far_vision = ?,
    bp = ?,
    pulse = ?,
    systemic = ?,
    known_case_of_epilepsy = ?,
    frequent_headache = ?,
    limping_gait = ?,
    physical_deformity = ?,
    flat_foot = ?,
    mental_depression = ?,
    height_phobia = ?,
    height_phobia_image = ?,
    physical_deformity_image = ?,
    sugar_level = ?,
    blood_group = ?,
    pallor = ?,
    lymphadenopathy = ?,
    icterus = ?,
    cyanosis = ?,
    edema = ?,
    medical_history = ?,
    other_health_info = ?,
    other_health_details = ?,
    final_conclusion = ?,
    status = ?,
    active = ?,
    site_id = ?,
    user_id = ?
  WHERE id = ?;
`;

export { GET_NURSE_RECORDS_BY_SITE, UPDATE_NURSE_RECORD };
