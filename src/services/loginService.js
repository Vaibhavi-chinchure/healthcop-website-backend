import db from "../config/db.js";
import { GET_USER_DETAILS_BY_EMAIL } from "../constants/loginQueries.js";

export const getUserDetailsByEmailService = async (email) => {
  try {
    const [rows] = await db.query(GET_USER_DETAILS_BY_EMAIL, [email]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};
