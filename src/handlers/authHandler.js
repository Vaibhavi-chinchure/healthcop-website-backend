// const authService = require("../services/authService");

// exports.signup = async (req, res, next) => {
//   try {
//     const result = await authService.signup(req.body);
//     res.status(201).json(result);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     const result = await authService.login(req.body);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };
const authService = require("../services/authService");

exports.signup = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// 🔹 Reset Password handler
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
