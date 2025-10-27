import attendanceService from "../services/attendanceService.js";

export async function loginHandler(req, res) {
  try {
    const { user_id, site_id, site_name, login_location, device_name } = req.body;
    if (!user_id || !site_id) {
      return res.status(400).json({ success: false, message: "user_id and site_id are required" });
    }

    // Use server time if not provided
    const login_time = new Date();

    const { insertId } = await attendanceService.createLogin({
      user_id,
      site_id,
      site_name,
      login_time,
      login_location,
      device_name,
    });

    const created = await attendanceService.getSessionById(insertId);
    return res.status(201).json({ success: true, message: "Logged in successfully", data: created });
  } catch (err) {
    console.error("loginHandler error", {
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function logoutHandler(req, res) {
  try {
    const sessionId = req.params.id;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: "session id required" });
    }

    const { logout_location, device_name } = req.body;
    const logout_time = new Date();

    const sessionBefore = await attendanceService.getSessionById(sessionId);
    if (!sessionBefore) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }
    if (sessionBefore.status !== "logged_in") {
      return res.status(400).json({ success: false, message: "Session is not active or already logged out" });
    }

    const { affectedRows } = await attendanceService.doLogout({
      sessionId,
      logout_time,
      logout_location,
      device_name,
    });

    if (!affectedRows) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    const updated = await attendanceService.getSessionById(sessionId);
    return res.json({ success: true, message: "Logged out successfully", data: updated });
  } catch (err) {
    console.error("logoutHandler error", {
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getAllSessionsHandler(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId required" });
    }

    const sessions = await attendanceService.getAllSessionsByUser(userId);
    return res.json({ success: true, data: sessions });
  } catch (err) {
    console.error("getAllSessionsHandler error", {
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
