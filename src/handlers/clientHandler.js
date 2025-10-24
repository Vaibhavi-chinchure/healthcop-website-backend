import pool from "../config/db.js";
import * as clientService from "../services/clientService.js";

export const addClient = async (req, res, next) => {
  try {
    console.log("📥 Incoming body:", req.body);
    console.log("📂 Uploaded files:", req.files);

    const clientData = {
      client_name: req.body.clientName,
      total_sites: parseInt(req.body.totalSites, 10),
      sites: [],
      officers: [],
    };

    // Parse officers
    if (req.body.officers) {
      try {
        clientData.officers = JSON.parse(req.body.officers);
      } catch {
        clientData.officers = [];
      }
    }

    // Collect sites
    const sites = [];
    let i = 0;
    while (req.body[`site_${i}_name`]) {
      const workOrderFile = req.files.find(
        (f) => f.fieldname === `site_${i}_workOrder`
      );
      const workOrderPath = req.body[`site_${i}_workOrderPath`] || (workOrderFile ? `clientsorders/${workOrderFile.filename}` : null);

      sites.push({
        site_name: req.body[`site_${i}_name`],
        location: req.body[`site_${i}_location`] || "N/A",
        deliverables: req.body[`site_${i}_deliverables`]
          ? JSON.parse(req.body[`site_${i}_deliverables`])
          : [],
        tentative_labours: req.body[`site_${i}_tentativeLabours`] || null,
        labour_turnover: req.body[`site_${i}_labourTurnover`] || null,
        work_order: workOrderPath,
      });

      i++;
    }
    clientData.sites = sites;

    const result = await clientService.addClient(clientData);
    res.status(201).json(result);
  } catch (err) {
    console.error("❌ Failed to add Client:", err.message);
    next(err);
  }
};

export const getAllClients = async (req, res, next) => {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (err) {
    console.error("Failed to fetch clients:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getClientById = async (req, res, next) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    res.json(client);
  } catch (err) {
    console.error("Failed to fetch client by ID:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateClient = async (req, res, next) => {
  try {
    console.log("📥 Update body:", req.body);
    console.log("📂 Update files:", req.files);

    const clientData = {
      client_name: req.body.clientName,
      total_sites: parseInt(req.body.totalSites, 10),
      sites: [],
      officers: [],
    };

    // Parse officers
    if (req.body.officers) {
      try {
        clientData.officers = JSON.parse(req.body.officers);
      } catch {
        clientData.officers = [];
      }
    }

    // Collect sites
    const sites = [];
    let i = 0;
    while (req.body[`site_${i}_name`]) {
      const workOrderFile = req.files.find(
        (f) => f.fieldname === `site_${i}_workOrder`
      );
      const workOrderPath = req.body[`site_${i}_workOrderPath`] || (workOrderFile ? `clientsorders/${workOrderFile.filename}` : null);

      sites.push({
        site_name: req.body[`site_${i}_name`],
        location: req.body[`site_${i}_location`] || "N/A",
        deliverables: req.body[`site_${i}_deliverables`]
          ? JSON.parse(req.body[`site_${i}_deliverables`])
          : [],
        tentative_labours: req.body[`site_${i}_tentativeLabours`] || null,
        labour_turnover: req.body[`site_${i}_labourTurnover`] || null,
        work_order: workOrderPath,
      });

      i++;
    }
    clientData.sites = sites;

    const result = await clientService.updateClient(req.params.id, clientData);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Failed to update Client:", err.message);
    next(err);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const result = await clientService.deleteClient(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Failed to delete Client:", err.message);
    next(err);
  }
};
