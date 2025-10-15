

// // const pool = require("../config/db");
// // const queries = require("../constants/clientQueries");

// // exports.addClient = async (clientData) => {
// //   const { client_name, total_sites, sites, officers } = clientData || {};

// //   // Validate client_name and total_sites
// //   if (!client_name || client_name.trim() === "") {
// //     throw new Error("Client name is required");
// //   }
// //   if (total_sites === undefined || total_sites === null || isNaN(total_sites)) {
// //     throw new Error("Total sites must be a valid number");
// //   }
// //   if (total_sites < 0) {
// //     throw new Error("Total sites cannot be negative");
// //   }

// //   // Validate sites and deliverables
// //   for (const site of sites) {
// //     if (!site.site_name || site.site_name.trim() === "") {
// //       throw new Error("Site name is required");
// //     }
// //     if (!Array.isArray(site.deliverables)) {
// //       throw new Error("Deliverables must be an array");
// //     }
// //     site.deliverables = site.deliverables.filter((d) => typeof d === "string" && d.length > 0);
// //   }

// //   const connection = await pool.getConnection();
// //   try {
// //     await connection.beginTransaction();

// //     let newClientCode;
// //     try {
// //       const [lastRecord] = await connection.query(
// //         `SELECT client_code FROM hop_clients WHERE client_code LIKE 'HOP-CLI-%' ORDER BY CAST(SUBSTRING(client_code, 9) AS UNSIGNED) DESC LIMIT 1`
// //       );
// //       let newIdNumber = 1;
// //       if (lastRecord.length > 0 && lastRecord[0].client_code) {
// //         const lastCode = lastRecord[0].client_code;
// //         const lastNumber = parseInt(lastCode.split("-")[2], 10);
// //         if (!isNaN(lastNumber)) {
// //           newIdNumber = lastNumber + 1;
// //         }
// //       }
// //       newClientCode = `HOP-CLI-${newIdNumber.toString().padStart(4, "0")}`;
// //     } catch (err) {
// //       console.error("Error generating client_code:", err.message);
// //       throw new Error("Failed to generate client_code");
// //     }

// //     const [existingRecord] = await connection.query(
// //       `SELECT client_code FROM hop_clients WHERE client_code = ?`,
// //       [newClientCode]
// //     );
// //     if (existingRecord.length > 0) {
// //       throw new Error(`client_code ${newClientCode} already exists`);
// //     }

// //     const [clientResult] = await connection.query(queries.INSERT_CLIENT, [
// //       newClientCode,
// //       client_name.trim(),
// //       total_sites,
// //     ]);

// //     if (clientResult.affectedRows === 0) {
// //       throw new Error("Failed to insert Client");
// //     }

// //     const client_id = clientResult.insertId;

// //     for (const site of sites) {
// //       const [siteResult] = await connection.query(queries.INSERT_SITE, [
// //         client_id,
// //         site.site_name.trim(),
// //         site.location || "N/A",
// //         JSON.stringify(site.deliverables),
// //         site.tentative_labours,
// //         site.labour_turnover,
// //         site.work_order,
// //       ]);

// //       if (siteResult.affectedRows === 0) {
// //         throw new Error(`Failed to insert site ${site.site_name}`);
// //       }
// //     }

// //     for (const officer of officers) {
// //       if (officer.name && officer.position && officer.phone && officer.email) {
// //         const [officerResult] = await connection.query(queries.INSERT_OFFICER, [
// //           client_id,
// //           officer.name,
// //           officer.position,
// //           officer.phone,
// //           officer.email,
// //         ]);

// //         if (officerResult.affectedRows === 0) {
// //           throw new Error(`Failed to insert officer ${officer.name}`);
// //         }
// //       }
// //     }

// //     await connection.commit();

// //     const [rows] = await connection.query(
// //       `SELECT client_id, client_code FROM hop_clients WHERE client_code = ?`,
// //       [newClientCode]
// //     );
// //     return rows[0] || { client_id, client_code: newClientCode };
// //   } catch (err) {
// //     await connection.rollback();
// //     console.error("❌ addClient failed:", err);
// //     throw err;
// //   } finally {
// //     connection.release();
// //   }
// // };

// // // Update getAllClients, getClientById, updateClient, deleteClient similarly...
// // exports.getAllClients = async () => {
// //   const [rows] = await pool.query(queries.GET_ALL_CLIENTS_FULL);
// //   const clients = [];
// //   const clientMap = new Map();

// //   for (const row of rows) {
// //     const { client_id, client_code, client_name, total_sites, created_at, site_id, officer_id } = row;

// //     if (!clientMap.has(client_id)) {
// //       clientMap.set(client_id, {
// //         client_id,
// //         client_code,
// //         client_name: client_name || "Unknown Client",
// //         total_sites: total_sites || 0,
// //         created_at: created_at || new Date().toISOString(),
// //         sites: [],
// //         officers: [],
// //       });
// //     }

// //     const client = clientMap.get(client_id);

// //     if (site_id) {
// //       let deliverables = [];
// //       try {
// //         if (row.deliverables) {
// //           // Handle string input like "Doctor Visits"
// //           if (typeof row.deliverables === "string" && !row.deliverables.startsWith("[")) {
// //             deliverables = [row.deliverables];
// //             console.warn(`Fixed non-array deliverables for site_id ${site_id}:`, row.deliverables);
// //           } else {
// //             deliverables = JSON.parse(row.deliverables);
// //             if (!Array.isArray(deliverables)) {
// //               console.warn(`Invalid deliverables format for site_id ${site_id}:`, row.deliverables);
// //               deliverables = [];
// //             }
// //           }
// //         }
// //       } catch (err) {
// //         console.error(`Failed to parse deliverables for site_id ${site_id}:`, err.message);
// //         deliverables = [];
// //       }

// //       client.sites.push({
// //         site_id,
// //         location: row.location || "N/A",
// //         deliverables,
// //         tentative_labours: row.tentative_labours || 0,
// //         labour_turnover: row.labour_turnover || 0,
// //         work_order: row.work_order || null,
// //       });
// //     }

// //     if (officer_id) {
// //       client.officers.push({
// //         officer_id,
// //         name: row.officer_name || "N/A",
// //         position: row.position || "N/A",
// //         phone: row.phone || "N/A",
// //         email: row.email || "N/A",
// //       });
// //     }
// //   }

// //   return Array.from(clientMap.values());
// // };

// // exports.getClientById = async (id) => {
// //   const [rows] = await pool.query(queries.GET_CLIENT_BY_ID, [id]);
// //   if (rows.length === 0) throw new Error("Client not found");

// //   const client = {
// //     client_id: rows[0].client_id,
// //     client_code: rows[0].client_code,
// //     client_name: rows[0].client_name || "Unknown Client",
// //     total_sites: rows[0].total_sites || 0,
// //     created_at: rows[0].created_at || new Date().toISOString(),
// //     sites: [],
// //     officers: [],
// //   };

// //   for (const row of rows) {
// //     if (row.site_id) {
// //       let deliverables = [];
// //       try {
// //         if (row.deliverables) {
// //           if (typeof row.deliverables === "string" && !row.deliverables.startsWith("[")) {
// //             deliverables = [row.deliverables];
// //             console.warn(`Fixed non-array deliverables for site_id ${row.site_id}:`, row.deliverables);
// //           } else {
// //             deliverables = JSON.parse(row.deliverables);
// //             if (!Array.isArray(deliverables)) {
// //               console.warn(`Invalid deliverables format for site_id ${row.site_id}:`, row.deliverables);
// //               deliverables = [];
// //             }
// //           }
// //         }
// //       } catch (err) {
// //         console.error(`Failed to parse deliverables for site_id ${row.site_id}:`, err.message);
// //         deliverables = [];
// //       }

// //       client.sites.push({
// //         site_id: row.site_id,
// //         location: row.location || "N/A",
// //         deliverables,
// //         tentative_labours: row.tentative_labours || 0,
// //         labour_turnover: row.labour_turnover || 0,
// //         work_order: row.work_order || null,
// //       });
// //     }
// //     if (row.officer_id) {
// //       client.officers.push({
// //         officer_id: row.officer_id,
// //         name: row.officer_name || "N/A",
// //         position: row.position || "N/A",
// //         phone: row.phone || "N/A",
// //         email: row.email || "N/A",
// //       });
// //     }
// //   }

// //   return client;
// // };

// // exports.updateClient = async (id, data) => {
// //   const { client_name, total_sites } = data || {};

// //   const [result] = await pool.query(queries.UPDATE_CLIENT, [
// //     client_name,
// //     total_sites,
// //     id,
// //   ]);

// //   if (result.affectedRows === 0) {
// //     throw new Error("No Client found to update");
// //   }

// //   return { message: "Client updated successfully", affectedRows: result.affectedRows };
// // };

// // exports.deleteClient = async (id) => {
// //   const [result] = await pool.query(queries.DELETE_CLIENT, [id]);
// //   if (result.affectedRows === 0) {
// //     throw new Error("No Client found to delete");
// //   }
// //   return { message: "Client deleted successfully" };
// // };

// const pool = require("../config/db");
// const queries = require("../constants/clientQueries");

// // =========================
// // Add Client
// // =========================
// exports.addClient = async (clientData) => {
//   const { client_name, total_sites, sites = [], officers = [] } = clientData || {};

//   // ---- Validation ----
//   if (!client_name || client_name.trim() === "") {
//     throw new Error("Client name is required");
//   }
//   if (total_sites === undefined || total_sites === null || isNaN(total_sites)) {
//     throw new Error("Total sites must be a valid number");
//   }
//   if (total_sites < 0) {
//     throw new Error("Total sites cannot be negative");
//   }

//   // Validate sites
//   for (const site of sites) {
//     if (!site.site_name || site.site_name.trim() === "") {
//       throw new Error("Site name is required");
//     }
//     if (!Array.isArray(site.deliverables)) {
//       throw new Error("Deliverables must be an array");
//     }
//     site.deliverables = site.deliverables.filter(
//       (d) => typeof d === "string" && d.length > 0
//     );
//   }

//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();

//     // ---- Generate client_id ----
//     let newClientId;
//     const [lastRecord] = await connection.query(
//       `SELECT client_id FROM hop_clients WHERE client_id LIKE 'HOP-CLI-%'
//        ORDER BY CAST(SUBSTRING(client_id, 9) AS UNSIGNED) DESC LIMIT 1`
//     );
//     let newIdNumber = 1;
//     if (lastRecord.length > 0 && lastRecord[0].client_id) {
//       const lastCode = lastRecord[0].client_id;
//       const lastNumber = parseInt(lastCode.split("-")[2], 10);
//       if (!isNaN(lastNumber)) {
//         newIdNumber = lastNumber + 1;
//       }
//     }
//     newClientId = `HOP-CLI-${newIdNumber.toString().padStart(4, "0")}`;

//     // ---- Insert client ----
//     const [clientResult] = await connection.query(queries.INSERT_CLIENT, [
//       newClientId,
//       client_name.trim(),
//       total_sites,
//     ]);
//     if (clientResult.affectedRows === 0) {
//       throw new Error("Failed to insert Client");
//     }

//     // ---- Insert sites ----
//     for (const site of sites) {
//       const [siteResult] = await connection.query(queries.INSERT_SITE, [
//         newClientId,
//         site.site_name.trim(),
//         site.location || "N/A",
//         JSON.stringify(site.deliverables),
//         site.tentative_labours || 0,
//         site.labour_turnover || 0,
//         site.work_order || null,
//       ]);
//       if (siteResult.affectedRows === 0) {
//         throw new Error(`Failed to insert site ${site.site_name}`);
//       }
//     }

//     // ---- Insert officers ----
//     for (const officer of officers) {
//       if (officer.name && officer.position && officer.phone && officer.email) {
//         const [officerResult] = await connection.query(queries.INSERT_OFFICER, [
//           newClientId,
//           officer.name,
//           officer.position,
//           officer.phone,
//           officer.email,
//         ]);
//         if (officerResult.affectedRows === 0) {
//           throw new Error(`Failed to insert officer ${officer.name}`);
//         }
//       }
//     }

//     await connection.commit();
//     return { client_id: newClientId, message: "Client added successfully" };
//   } catch (err) {
//     await connection.rollback();
//     console.error("❌ addClient failed:", err);
//     throw err;
//   } finally {
//     connection.release();
//   }
// };

// // =========================
// // Get All Clients
// // =========================

// // Get all clients
// exports.getAllClients = async () => {
//   const [rows] = await pool.query(queries.GET_ALL_CLIENTS_FULL);
//   const clients = [];
//   const clientMap = new Map();

//   for (const row of rows) {
//     const { client_id, client_name, total_sites, created_at, site_id, officer_id } = row;

//     if (!clientMap.has(client_id)) {
//       clientMap.set(client_id, {
//         client_id,
//         client_name: client_name || "Unknown Client",
//         total_sites: total_sites || 0,
//         created_at: created_at || new Date().toISOString(),
//         sites: [],
//         officers: [],
//       });
//     }

//     const client = clientMap.get(client_id);

//     // Sites
//     if (site_id) {
//       let deliverables = [];
//       try {
//         if (row.deliverables) {
//           deliverables = JSON.parse(row.deliverables);
//           if (!Array.isArray(deliverables)) deliverables = [];
//         }
//       } catch {
//         deliverables = [];
//       }
//       client.sites.push({
//         site_id,
//         site_name: row.site_name || "N/A",
//         location: row.location || "N/A",
//         deliverables,
//         tentative_labours: row.tentative_labours || 0,
//         labour_turnover: row.labour_turnover || 0,
//         work_order: row.work_order || null,
//       });
//     }

//     // Officers
//     if (officer_id) {
//       client.officers.push({
//         officer_id,
//         name: row.officer_name || "N/A",
//         position: row.position || "N/A",
//         phone: row.phone || "N/A",
//         email: row.email || "N/A",
//       });
//     }
//   }

//   return Array.from(clientMap.values());
// };

// // Get client by ID
// exports.getClientById = async (id) => {
//   const [rows] = await pool.query(queries.GET_CLIENT_BY_ID, [id]);
//   if (rows.length === 0) throw new Error("Client not found");

//   const client = {
//     client_id: rows[0].client_id,
//     client_name: rows[0].client_name,
//     total_sites: rows[0].total_sites || 0,
//     created_at: rows[0].created_at || new Date().toISOString(),
//     sites: [],
//     officers: [],
//   };

//   for (const row of rows) {
//     if (row.site_id) {
//       let deliverables = [];
//       try {
//         if (row.deliverables) deliverables = JSON.parse(row.deliverables);
//       } catch {
//         deliverables = [];
//       }
//       client.sites.push({
//         site_id: row.site_id,
//         site_name: row.site_name || "N/A",
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


// // =========================
// // Get Client By ID
// // =========================
// exports.getClientById = async (id) => {
//   const [rows] = await pool.query(queries.GET_CLIENT_BY_ID, [id]);
//   if (rows.length === 0) throw new Error("Client not found");

//   const client = {
//     client_id: rows[0].client_id,
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
//           if (
//             typeof row.deliverables === "string" &&
//             !row.deliverables.startsWith("[")
//           ) {
//             deliverables = [row.deliverables];
//           } else {
//             deliverables = JSON.parse(row.deliverables);
//             if (!Array.isArray(deliverables)) deliverables = [];
//           }
//         }
//       } catch {
//         deliverables = [];
//       }

//       client.sites.push({
//         site_id: row.site_id,
//         site_name: row.site_name,
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

// // =========================
// // Update Client
// // =========================
// exports.updateClient = async (id, data) => {
//   const { client_name, total_sites } = data || {};

//   const [result] = await pool.query(queries.UPDATE_CLIENT, [
//     client_name,
//     total_sites,
//     id,
//   ]);

//   if (result.affectedRows === 0) {
//     throw new Error("No Client found to update");
//   }

//   return { message: "Client updated successfully" };
// };

// // =========================
// // Delete Client
// // =========================
// exports.deleteClient = async (id) => {
//   const [result] = await pool.query(queries.DELETE_CLIENT, [id]);
//   if (result.affectedRows === 0) {
//     throw new Error("No Client found to delete");
//   }
//   return { message: "Client deleted successfully" };
// };

const pool = require("../config/db");
const queries = require("../constants/clientQueries");

exports.addClient = async (clientData) => {
  const { client_name, total_sites, sites = [], officers = [] } = clientData || {};

  // ---- Validation ----
  if (!client_name || client_name.trim() === "") {
    throw new Error("Client name is required");
  }
  if (total_sites === undefined || total_sites === null || isNaN(total_sites)) {
    throw new Error("Total sites must be a valid number");
  }
  if (total_sites < 0) {
    throw new Error("Total sites cannot be negative");
  }

  // Validate sites
  for (const site of sites) {
    if (!site.site_name || site.site_name.trim() === "") {
      throw new Error("Site name is required");
    }
    if (!Array.isArray(site.deliverables)) {
      throw new Error("Deliverables must be an array");
    }
    site.deliverables = site.deliverables.filter(
      (d) => typeof d === "string" && d.length > 0
    );
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // ---- Generate client_id ----
    let newClientId;
    const [lastRecord] = await connection.query(
      `SELECT client_id FROM hop_clients WHERE client_id LIKE 'HOP-CLI-%'
       ORDER BY CAST(SUBSTRING(client_id, 9) AS UNSIGNED) DESC LIMIT 1`
    );
    let newIdNumber = 1;
    if (lastRecord.length > 0 && lastRecord[0].client_id) {
      const lastCode = lastRecord[0].client_id;
      const lastNumber = parseInt(lastCode.split("-")[2], 10);
      if (!isNaN(lastNumber)) {
        newIdNumber = lastNumber + 1;
      }
    }
    newClientId = `HOP-CLI-${newIdNumber.toString().padStart(4, "0")}`;

    // ---- Insert client ----
    const [clientResult] = await connection.query(queries.INSERT_CLIENT, [
      newClientId,
      client_name.trim(),
      total_sites,
    ]);
    if (clientResult.affectedRows === 0) {
      throw new Error("Failed to insert Client");
    }

    // ---- Insert sites ----
    for (const site of sites) {
      const [siteResult] = await connection.query(queries.INSERT_SITE, [
        newClientId,
        site.site_name.trim(),
        site.location || "N/A",
        JSON.stringify(site.deliverables),
        site.tentative_labours || 0,
        site.labour_turnover || 0,
        site.work_order || null,
      ]);
      if (siteResult.affectedRows === 0) {
        throw new Error(`Failed to insert site ${site.site_name}`);
      }
    }

    // ---- Insert officers ----
    for (const officer of officers) {
      if (officer.name && officer.position && officer.phone && officer.email) {
        const [officerResult] = await connection.query(queries.INSERT_OFFICER, [
          newClientId,
          officer.name,
          officer.position,
          officer.phone,
          officer.email,
        ]);
        if (officerResult.affectedRows === 0) {
          throw new Error(`Failed to insert officer ${officer.name}`);
        }
      }
    }

    await connection.commit();
    return { client_id: newClientId, message: "Client added successfully" };
  } catch (err) {
    await connection.rollback();
    console.error("❌ addClient failed:", err);
    throw err;
  } finally {
    connection.release();
  }
};

exports.getAllClients = async () => {
  const [rows] = await pool.query(queries.GET_ALL_CLIENTS_FULL);
  const clients = [];
  const clientMap = new Map();

  for (const row of rows) {
    const { client_id, client_name, total_sites, created_at, site_id, officer_id } = row;

    if (!clientMap.has(client_id)) {
      clientMap.set(client_id, {
        client_id,
        client_name: client_name || "Unknown Client",
        total_sites: total_sites || 0,
        created_at: created_at || new Date().toISOString(),
        sites: [],
        officers: [],
      });
    }

    const client = clientMap.get(client_id);

    if (site_id) {
      let deliverables = [];
      try {
        if (row.deliverables) {
          deliverables = JSON.parse(row.deliverables);
          if (!Array.isArray(deliverables)) deliverables = [];
        }
      } catch {
        deliverables = [];
      }
      client.sites.push({
        site_id,
        site_name: row.site_name || "N/A",
        location: row.location || "N/A",
        deliverables,
        tentative_labours: row.tentative_labours || 0,
        labour_turnover: row.labour_turnover || 0,
        work_order: row.work_order || null,
      });
    }

    if (officer_id) {
      client.officers.push({
        officer_id,
        name: row.officer_name || "N/A",
        position: row.position || "N/A",
        phone: row.phone || "N/A",
        email: row.email || "N/A",
      });
    }
  }

  return Array.from(clientMap.values());
};

exports.getClientById = async (id) => {
  const [rows] = await pool.query(queries.GET_CLIENT_BY_ID, [id]);
  if (rows.length === 0) throw new Error("Client not found");

  const client = {
    client_id: rows[0].client_id,
    client_name: rows[0].client_name || "Unknown Client",
    total_sites: rows[0].total_sites || 0,
    created_at: rows[0].created_at || new Date().toISOString(),
    sites: [],
    officers: [],
  };

  for (const row of rows) {
    if (row.site_id) {
      let deliverables = [];
      try {
        if (row.deliverables) {
          if (typeof row.deliverables === "string" && !row.deliverables.startsWith("[")) {
            deliverables = [row.deliverables];
          } else {
            deliverables = JSON.parse(row.deliverables);
            if (!Array.isArray(deliverables)) deliverables = [];
          }
        }
      } catch {
        deliverables = [];
      }
      client.sites.push({
        site_id: row.site_id,
        site_name: row.site_name || "N/A",
        location: row.location || "N/A",
        deliverables,
        tentative_labours: row.tentative_labours || 0,
        labour_turnover: row.labour_turnover || 0,
        work_order: row.work_order || null,
      });
    }
    if (row.officer_id) {
      client.officers.push({
        officer_id: row.officer_id,
        name: row.officer_name || "N/A",
        position: row.position || "N/A",
        phone: row.phone || "N/A",
        email: row.email || "N/A",
      });
    }
  }

  return client;
};

exports.updateClient = async (id, clientData) => {
  const { client_name, total_sites, sites = [], officers = [] } = clientData || {};

  // ---- Validation ----
  if (!client_name || client_name.trim() === "") {
    throw new Error("Client name is required");
  }
  if (total_sites === undefined || total_sites === null || isNaN(total_sites)) {
    throw new Error("Total sites must be a valid number");
  }
  if (total_sites < 0) {
    throw new Error("Total sites cannot be negative");
  }

  // Validate sites
  for (const site of sites) {
    if (!site.site_name || site.site_name.trim() === "") {
      throw new Error("Site name is required");
    }
    if (!Array.isArray(site.deliverables)) {
      throw new Error("Deliverables must be an array");
    }
    site.deliverables = site.deliverables.filter(
      (d) => typeof d === "string" && d.length > 0
    );
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // ---- Update client ----
    const [clientResult] = await connection.query(queries.UPDATE_CLIENT, [
      client_name.trim(),
      total_sites,
      id,
    ]);
    if (clientResult.affectedRows === 0) {
      throw new Error("No Client found to update");
    }

    // ---- Delete existing sites and officers ----
    await connection.query(queries.DELETE_SITES_BY_CLIENT, [id]);
    await connection.query(queries.DELETE_OFFICERS_BY_CLIENT, [id]);

    // ---- Insert new sites ----
    for (const site of sites) {
      const [siteResult] = await connection.query(queries.INSERT_SITE, [
        id,
        site.site_name.trim(),
        site.location || "N/A",
        JSON.stringify(site.deliverables),
        site.tentative_labours || 0,
        site.labour_turnover || 0,
        site.work_order || null,
      ]);
      if (siteResult.affectedRows === 0) {
        throw new Error(`Failed to insert site ${site.site_name}`);
      }
    }

    // ---- Insert new officers ----
    for (const officer of officers) {
      if (officer.name && officer.position && officer.phone && officer.email) {
        const [officerResult] = await connection.query(queries.INSERT_OFFICER, [
          id,
          officer.name,
          officer.position,
          officer.phone,
          officer.email,
        ]);
        if (officerResult.affectedRows === 0) {
          throw new Error(`Failed to insert officer ${officer.name}`);
        }
      }
    }

    await connection.commit();
    return { client_id: id, message: "Client updated successfully" };
  } catch (err) {
    await connection.rollback();
    console.error("❌ updateClient failed:", err);
    throw err;
  } finally {
    connection.release();
  }
};

exports.deleteClient = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Delete sites and officers first due to foreign key constraints
    await connection.query(queries.DELETE_SITES_BY_CLIENT, [id]);
    await connection.query(queries.DELETE_OFFICERS_BY_CLIENT, [id]);

    // Delete client
    const [result] = await connection.query(queries.DELETE_CLIENT, [id]);
    if (result.affectedRows === 0) {
      throw new Error("No Client found to delete");
    }

    await connection.commit();
    return { message: "Client deleted successfully" };
  } catch (err) {
    await connection.rollback();
    console.error("❌ deleteClient failed:", err);
    throw err;
  } finally {
    connection.release();
  }
};
