import db from "../config/db.js";
import { GET_ALL_SITES } from "../constants/siteQueries.js";

const getAllSitesService = async () => {
  try {
    const [rows] = await db.query(GET_ALL_SITES);
    return rows;
  } catch (error) {
    throw error;
  }
};

export { getAllSitesService };
