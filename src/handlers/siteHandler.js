import { getAllSitesService } from "../services/siteService.js";

const getAllSitesHandler = async (req, res) => {
  try {
    const sites = await getAllSitesService();
    res.status(200).json(sites);
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getAllSitesHandler };
