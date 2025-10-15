// services/attendanceService.js
const pool = require('../config/db');
const Q = require('../constants/attendanceQueries');

async function createLogin({ user_id, site_id, site_name, login_time, login_location, device_name }) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(Q.INSERT_LOGIN, [
      user_id,
      site_id,
      site_name || null,
      login_time,
      login_location || null,
      device_name || null
    ]);
    return { insertId: result.insertId };
  } finally {
    conn.release();
  }
}

async function doLogout({ sessionId, logout_time, logout_location, device_name }) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(Q.UPDATE_LOGOUT, [
      logout_time,
      logout_location || null,
      device_name || null,
      sessionId
    ]);
    return { affectedRows: result.affectedRows };
  } finally {
    conn.release();
  }
}

async function getActiveSessionByUser(user_id) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.execute(Q.GET_ACTIVE_BY_USER, [user_id]);
    return rows[0] ?? null;
  } finally {
    conn.release();
  }
}

async function getSessionById(id) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.execute(Q.GET_BY_ID, [id]);
    return rows[0] ?? null;
  } finally {
    conn.release();
  }
}

module.exports = {
  createLogin,
  doLogout,
  getActiveSessionByUser,
  getSessionById
};
