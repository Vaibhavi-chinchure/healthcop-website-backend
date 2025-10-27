import pool from "../config/db.js";
import queries from "../constants/doctorNurseQueries.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// Debug environment variables
console.log('SENDGRID_API_KEY (masked):', process.env.SENDGRID_API_KEY ? `${process.env.SENDGRID_API_KEY.substring(0, 5)}...` : 'MISSING');
console.log('FROM_EMAIL:', process.env.FROM_EMAIL || 'MISSING');

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const addDoctorNurse = async (data) => {
  const {
    role,
    name,
    email,
    mobile,
    dob,
    age,
    residence,
    maritalStatus,
    degreeName,
    yearOfPassing,
    photo = null,
    signature = null,
    degreeCertificate = null,
    aadharCard = null,
    panCard = null,
    cancelledCheque = null,
    declaration = null,
    status = "Active",
  } = data || {};

  if (!role || !name || !email || !mobile || !dob || !degreeName || !yearOfPassing) {
    throw new Error("Missing required fields: role, name, email, mobile, dob, degreeName, yearOfPassing");
  }

  // Validate role
  const rolePrefix = role.toLowerCase() === "doctor" ? "DOC" : role.toLowerCase() === "nurse" ? "NUR" : null;
  if (!rolePrefix) {
    throw new Error("Invalid role: must be 'Doctor' or 'Nurse'");
  }

  // Start a transaction to ensure data consistency
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Generate custom USRID (HOP-<ROLE>-XXXX)
    let newUSRID;
    try {
      const [lastRecord] = await connection.query(
        `SELECT USRID FROM doctor_nurse WHERE USRID LIKE ? ORDER BY CAST(SUBSTRING(USRID, 9) AS UNSIGNED) DESC LIMIT 1`,
        [`HOP-${rolePrefix}-%`]
      );
      let newIdNumber = 1;
      if (lastRecord.length > 0 && lastRecord[0].USRID) {
        const lastId = lastRecord[0].USRID;
        const lastNumber = parseInt(lastId.split("-")[2], 10);
        if (!isNaN(lastNumber)) {
          newIdNumber = lastNumber + 1;
        }
      }
      newUSRID = `HOP-${rolePrefix}-${newIdNumber.toString().padStart(4, "0")}`;
    } catch (err) {
      console.error("Error generating USRID:", err.message);
      throw new Error("Failed to generate USRID");
    }

    // Verify USRID doesn't already exist
    const [existingRecord] = await connection.query(
      `SELECT USRID FROM doctor_nurse WHERE USRID = ?`,
      [newUSRID]
    );
    if (existingRecord.length > 0) {
      throw new Error(`USRID ${newUSRID} already exists`);
    }

    // Create temporary password (random 8-char)
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Insert into hop_users table
    const [userResult] = await connection.query(
      `INSERT INTO hop_users (email, password, role) VALUES (?, ?, ?)`,
      [email, hashedPassword, role.toLowerCase()]
    );

    // Insert into doctor_nurse table with custom USRID
    const [result] = await connection.query(queries.INSERT_DOCTOR_NURSE, [
      newUSRID,
      role,
      name,
      email,
      mobile,
      dob,
      parseInt(age) || 0,
      residence || "",
      maritalStatus || "",
      degreeName,
      parseInt(yearOfPassing) || 0,
      photo,
      signature,
      degreeCertificate,
      aadharCard,
      panCard,
      cancelledCheque,
      declaration,
      status,
    ]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to insert Doctor/Nurse");
    }

    // Commit transaction
    await connection.commit();

    // Generate reset token (expires in 1 hour)
    const resetToken = jwt.sign({ email, userId: userResult.insertId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send reset email via SendGrid
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL, // Verified sender email
      subject: "Reset Your Password - HealthCop Account Created",
      html: `
        <h2>Password Reset Request</h2>
        <p>Hello ${name},</p>
        <p>Your HealthCop account has been created successfully. Your User ID is <strong>${newUSRID}</strong>.</p>
        <p>Please set your password by clicking the link below:</p>
        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        <p>Temporary Password (for reference, do not use directly): <strong>${tempPassword}</strong></p>
        <p>This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>HealthCop Pvt. Ltd.</p>
      `,
    };

    // Send email
    try {
      await sgMail.send(msg);
      console.log(`✅ Reset email sent successfully to ${email}`);
    } catch (emailErr) {
      console.error(`❌ Email sending failed for ${email}:`, emailErr.response ? emailErr.response.body : emailErr.message);
      console.log(`🔑 Temp password for ${email} (share manually): ${tempPassword}`);
      // Return the temp password in case email fails
      return { message: "Doctor/Nurse added successfully, but email sending failed", id: newUSRID, tempPassword };
    }

    // Fetch full doctor_nurse record
    const [rows] = await connection.query(queries.GET_DOCTOR_NURSE_BY_ID, [newUSRID]);
    return { ...rows[0], tempPassword }; // Include tempPassword in response
  } catch (err) {
    // Rollback transaction on error
    await connection.rollback();
    // Rollback hop_users insert if it was created
    if (userResult?.insertId) {
      await connection.query(`DELETE FROM hop_users WHERE id = ?`, [userResult.insertId]);
    }
    console.error("Error in addDoctorNurse:", err.message);
    throw err;
  } finally {
    connection.release();
  }
};

const getAllDoctorNurse = async () => {
  const [rows] = await pool.query(queries.GET_ALL_DOCTOR_NURSE);
  return rows;
};

const getDoctorNurseById = async (id) => {
  const [rows] = await pool.query(queries.GET_DOCTOR_NURSE_BY_ID, [id]);
  if (rows.length === 0) throw new Error("Doctor/Nurse not found");
  return rows[0];
};

const updateDoctorNurse = async (id, data) => {
  const {
    role,
    name,
    email,
    mobile,
    dob,
    age,
    residence,
    maritalStatus,
    degreeName,
    yearOfPassing,
    photo,
    signature,
    degreeCertificate,
    aadharCard,
    panCard,
    cancelledCheque,
    declaration,
    status = "Active",
  } = data || {};

  const [result] = await pool.query(queries.UPDATE_DOCTOR_NURSE, [
    role,
    name,
    email,
    mobile,
    dob,
    parseInt(age) || 0,
    residence || "",
    maritalStatus || "",
    degreeName,
    parseInt(yearOfPassing) || 0,
    photo,
    signature,
    degreeCertificate,
    aadharCard,
    panCard,
    cancelledCheque,
    declaration,
    status,
    id,
  ]);

  if (result.affectedRows === 0) {
    throw new Error("No Doctor/Nurse found to update");
  }

  return { message: "Doctor/Nurse updated successfully", affectedRows: result.affectedRows };
};

export { addDoctorNurse, getAllDoctorNurse, getDoctorNurseById, updateDoctorNurse };
