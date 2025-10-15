const GET_USER_DETAILS_BY_EMAIL = `
  SELECT 
    d.USRID,
    d.role,
    d.name,
    d.email,
    d.mobile,
    d.dob,
    d.age,
    d.residence,
    d.maritalStatus,
    d.degreeName,
    d.yearOfPassing,
    d.photo,
    d.signature,
    d.degreeCertificate,
    d.aadharCard,
    d.panCard,
    d.cancelledCheque,
    d.declaration,
    d.status,
    d.created_at
  FROM healthcop.doctor_nurse d
  INNER JOIN healthcop.hop_users u 
    ON d.email = u.email
  WHERE d.email = ?;
`;

module.exports = { GET_USER_DETAILS_BY_EMAIL };
