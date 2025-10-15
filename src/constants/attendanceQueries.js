// constants/attendanceQueries.js
module.exports = {
  INSERT_LOGIN: `INSERT INTO attendance_records (user_id, site_id, site_name, login_time, login_location, device_name, status)
                 VALUES (?, ?, ?, ?, ?, ?, 'logged_in')`,
  UPDATE_LOGOUT: `UPDATE attendance_records
                  SET logout_time = ?, logout_location = ?, status = 'logged_out', device_name = COALESCE(?, device_name)
                  WHERE id = ? AND status = 'logged_in'`,
  GET_ACTIVE_BY_USER: `SELECT * FROM attendance_records WHERE user_id = ? AND status = 'logged_in' ORDER BY login_time DESC LIMIT 1`,
  GET_BY_ID: `SELECT * FROM attendance_records WHERE id = ?`
};
