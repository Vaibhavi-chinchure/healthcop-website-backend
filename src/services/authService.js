import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import * as queries from "../constants/userQueries.js";
import dotenv from "dotenv";

dotenv.config();

export const signup = async ({ name, email, password, role }) => {
  let assignedRole = "client"; // always client
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(queries.INSERT_USER, [
    name,
    email,
    hashedPassword,
    assignedRole,
  ]);
  return { message: "Signup successful", userId: result.insertId };
};

export const login = async ({ email, password }) => {
  const [rows] = await pool.query(queries.FIND_USER_BY_EMAIL, [email]);
  const user = rows[0];
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { message: "Login successful", token, role: user.role };
};

// 🔹 Reset Password service
export const resetPassword = async (token, newPassword) => {
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, userId } = decoded;

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update DB
    const [result] = await pool.query(
      "UPDATE hop_users SET password = ? WHERE id = ? AND email = ?",
      [hashedPassword, userId, email]
    );

    if (result.affectedRows === 0) {
      throw new Error("User not found or already updated");
    }

    return { message: "Password reset successfully" };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Error("Reset token has expired");
    }
    throw new Error("Invalid or expired token");
  }
};
