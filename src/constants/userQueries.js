// userQueries.js
// module.exports = {
//   INSERT_USER: "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//   FIND_USER_BY_EMAIL: "SELECT * FROM users WHERE email = ?"
// };
// constants/userQueries.js

exports.INSERT_USER = `
  INSERT INTO hop_users (email, password, role)
  VALUES (?, ?, ?)
`;

exports.FIND_USER_BY_EMAIL = `
  SELECT * FROM hop_users WHERE email = ?
`;
