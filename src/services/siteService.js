const db = require("../config/db");
const { GET_ALL_SITES } = require("../constants/siteQueries");

const getAllSitesService = async () => {
  try {
    const [rows] = await db.query(GET_ALL_SITES);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllSitesService };
