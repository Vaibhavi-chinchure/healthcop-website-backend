const db = require("../config/db");
const { GET_USER_DETAILS_BY_EMAIL } = require("../constants/loginQueries");

const getUserDetailsByEmailService = async (email) => {
  try {
    const [rows] = await db.query(GET_USER_DETAILS_BY_EMAIL, [email]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserDetailsByEmailService };
