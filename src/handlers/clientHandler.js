// const pool = require("../config/db");  // 👈 Add this
// const queries = require("../constants/clientQueries"); // adjust path if needed

// const clientService = require("../services/clientService");

// exports.addClient = async (req, res, next) => {
//   try {
//     console.log("📥 Incoming body:", req.body);
//     console.log("📂 Uploaded files:", req.files);

//     const clientData = {
//       client_name: req.body.clientName,
//       total_sites: parseInt(req.body.totalSites, 10),
//       sites: [],
//       officers: [],
//     };

//     // Parse officers
//     if (req.body.officers) {
//       try {
//         clientData.officers = JSON.parse(req.body.officers);
//       } catch {
//         clientData.officers = [];
//       }
//     }

//     // Collect sites
//     const sites = [];
//     let i = 0;
//     while (req.body[`site_${i}_name`]) {
//       // Find file uploaded for this site
//       const workOrderFile = req.files.find(
//         (f) => f.fieldname === `site_${i}_workOrder`
//       );

//       sites.push({
//         site_name: req.body[`site_${i}_name`],
//         location: req.body[`site_${i}_location`] || "N/A",
//         deliverables: req.body[`site_${i}_deliverables`]
//           ? JSON.parse(req.body[`site_${i}_deliverables`])
//           : [],
//         tentative_labours: req.body[`site_${i}_tentativeLabours`] || null,
//         labour_turnover: req.body[`site_${i}_labourTurnover`] || null,
//         work_order: workOrderFile ? workOrderFile.path : null, // ✅ Save file path
//       });

//       i++;
//     }
//     clientData.sites = sites;

//     const result = await clientService.addClient(clientData);
//     res.status(201).json(result);
//   } catch (err) {
//     console.error("❌ Failed to add Client:", err.message);
//     next(err);
//   }
// };




// exports.getAllClients = async (req, res, next) => {
//   try {
//     const clients = await clientService.getAllClients();
//     res.json(clients);
//   } catch (err) {
//     console.error("Failed to fetch clients:", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getClientById = async (req, res, next) => {
//   try {
//     const client = await clientService.getClientById(req.params.id);
//     res.json(client);
//   } catch (err) {
//     console.error("Failed to fetch client by ID:", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.getClientById = async (id) => {
//   const [rows] = await pool.query(queries.GET_CLIENT_BY_ID, [id]);
//   if (rows.length === 0) throw new Error("Client not found");

//   const client = {
//     client_id: rows[0].client_id,
//     client_code: rows[0].client_code,
//     client_name: rows[0].client_name || "Unknown Client",
//     total_sites: rows[0].total_sites || 0,
//     created_at: rows[0].created_at || new Date().toISOString(),
//     sites: [],
//     officers: [],
//   };

//   for (const row of rows) {
//     if (row.site_id) {
//       let deliverables = [];
//       try {
//         if (row.deliverables) {
//           if (typeof row.deliverables === "string" && !row.deliverables.startsWith("[")) {
//             deliverables = [row.deliverables];
//             console.warn(`Fixed non-array deliverables for site_id ${row.site_id}:`, row.deliverables);
//           } else {
//             deliverables = JSON.parse(row.deliverables);
//             if (!Array.isArray(deliverables)) {
//               console.warn(`Invalid deliverables format for site_id ${row.site_id}:`, row.deliverables);
//               deliverables = [];
//             }
//           }
//         }
//       } catch (err) {
//         console.error(`Failed to parse deliverables for site_id ${row.site_id}:`, err.message);
//         deliverables = [];
//       }

//       client.sites.push({
//         site_id: row.site_id,
//         site_name: row.site_name || "N/A", // Add site_name
//         location: row.location || "N/A",
//         deliverables,
//         tentative_labours: row.tentative_labours || 0,
//         labour_turnover: row.labour_turnover || 0,
//         work_order: row.work_order || null,
//       });
//     }
//     if (row.officer_id) {
//       client.officers.push({
//         officer_id: row.officer_id,
//         name: row.officer_name || "N/A",
//         position: row.position || "N/A",
//         phone: row.phone || "N/A",
//         email: row.email || "N/A",
//       });
//     }
//   }

//   return client;
// };

// // ===================== Update Client =====================
// exports.updateClient = async (req, res, next) => {
//   try {
//     const result = await clientService.updateClient(req.params.id, req.body);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };

// // ===================== Delete Client =====================
// exports.deleteClient = async (req, res, next) => {
//   try {
//     const result = await clientService.deleteClient(req.params.id);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };


const pool = require("../config/db");
const clientService = require("../services/clientService");

exports.addClient = async (req, res, next) => {
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

exports.getAllClients = async (req, res, next) => {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (err) {
    console.error("Failed to fetch clients:", err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getClientById = async (req, res, next) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    res.json(client);
  } catch (err) {
    console.error("Failed to fetch client by ID:", err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.updateClient = async (req, res, next) => {
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

exports.deleteClient = async (req, res, next) => {
  try {
    const result = await clientService.deleteClient(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Failed to delete Client:", err.message);
    next(err);
  }
};
