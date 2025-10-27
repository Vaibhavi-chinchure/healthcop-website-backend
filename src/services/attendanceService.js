import pool from "../config/db.js";
import Q from "../constants/attendanceQueries.js";

export async function createLogin({ user_id, site_id, site_name, login_time, login_location, device_name }) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(Q.INSERT_LOGIN, [
      user_id,
      site_id,
      site_name || null,
      login_time,
      login_location || null,
      device_name || null,
    ]);
    return { insertId: result.insertId };
  } finally {
    conn.release();
  }
}

export async function doLogout({ sessionId, logout_time, logout_location, device_name }) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(Q.UPDATE_LOGOUT, [
      logout_time,
      logout_location || null,
      device_name || null,
      sessionId,
    ]);
    return { affectedRows: result.affectedRows };
  } finally {
    conn.release();
  }
}

export async function getActiveSessionByUser(user_id) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.execute(Q.GET_ACTIVE_BY_USER, [user_id]);
    return rows[0] ?? null;
  } finally {
    conn.release();
  }
}

export async function getSessionById(id) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.execute(Q.GET_BY_ID, [id]);
    return rows[0] ?? null;
  } finally {
    conn.release();
  }
}

export async function getAllSessionsByUser(user_id) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.execute(Q.GET_ALL_BY_USER, [user_id]);
    return rows;
  } finally {
    conn.release();
  }
}

export default {
  createLogin,
  doLogout,
  getActiveSessionByUser,
  getSessionById,
  getAllSessionsByUser,
};
