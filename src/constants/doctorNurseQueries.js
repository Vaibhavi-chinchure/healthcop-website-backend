


export default {
  INSERT_DOCTOR_NURSE: `
    INSERT INTO doctor_nurse
    (USRID, role, name, email, mobile, dob, age, residence, maritalStatus, degreeName, yearOfPassing,
     photo, signature, degreeCertificate, aadharCard, panCard, cancelledCheque, declaration, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  GET_ALL_DOCTOR_NURSE: `
    SELECT * FROM doctor_nurse ORDER BY created_at DESC
  `,
  GET_DOCTOR_NURSE_BY_ID: `
    SELECT * FROM doctor_nurse WHERE USRID = ?
  `,
  UPDATE_DOCTOR_NURSE: `
    UPDATE doctor_nurse
    SET role = ?, name = ?, email = ?, mobile = ?, dob = ?, age = ?, residence = ?,
        maritalStatus = ?, degreeName = ?, yearOfPassing = ?, photo = ?, signature = ?,
        degreeCertificate = ?, aadharCard = ?, panCard = ?, cancelledCheque = ?, declaration = ?, status = ?
    WHERE USRID = ?
  `
};
