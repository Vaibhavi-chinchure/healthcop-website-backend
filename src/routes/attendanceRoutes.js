// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const handler = require('../handlers/attendanceHandler');

/**
 * POST /attendance/login
 * Body: { user_id, site_id, site_name, login_location, device_name }
 */
router.post('/login', handler.loginHandler);

/**
 * PUT /attendance/logout/:id
 * Body: { logout_location, device_name }
 */
router.put('/logout/:id', handler.logoutHandler);

/**
 * GET /attendance/active/:userId
 */
router.get('/active/:userId', handler.getActiveSessionHandler);

module.exports = router;
