// // // // // clientQueries.js

// // // // module.exports = {
// // // //   // ===================== Clients =====================
// // // //   INSERT_CLIENT: `
// // // //     INSERT INTO hop_clients (client_name, total_sites)
// // // //     VALUES (?, ?)
// // // //   `,
// // // //   GET_ALL_CLIENTS: `
// // // //     SELECT * FROM hop_clients ORDER BY created_at DESC
// // // //   `,
// // // //   GET_CLIENT_BY_ID: `
// // // //     SELECT * FROM hop_clients WHERE client_id = ?
// // // //   `,
// // // //   UPDATE_CLIENT: `
// // // //     UPDATE hop_clients
// // // //     SET client_name = ?, total_sites = ?
// // // //     WHERE client_id = ?
// // // //   `,
// // // //   DELETE_CLIENT: `
// // // //     DELETE FROM hop_clients WHERE client_id = ?
// // // //   `,

// // // //   // ===================== Sites =====================
// // // //   INSERT_SITE: `
// // // //     INSERT INTO hop_sites (client_id, location, deliverables, tentative_labours, labour_turnover, work_order)
// // // //     VALUES (?, ?, ?, ?, ?, ?)
// // // //   `,
// // // //   GET_SITES_BY_CLIENT: `
// // // //     SELECT * FROM hop_sites WHERE client_id = ?
// // // //   `,
// // // //   UPDATE_SITE: `
// // // //     UPDATE hop_sites
// // // //     SET location = ?, deliverables = ?, tentative_labours = ?, labour_turnover = ?, work_order = ?
// // // //     WHERE site_id = ?
// // // //   `,
// // // //   DELETE_SITE: `
// // // //     DELETE FROM hop_sites WHERE site_id = ?
// // // //   `,

// // // //   // ===================== Officers =====================
// // // //   INSERT_OFFICER: `
// // // //     INSERT INTO hop_officers (client_id, name, position, phone, email)
// // // //     VALUES (?, ?, ?, ?, ?)
// // // //   `,
// // // //   GET_OFFICERS_BY_CLIENT: `
// // // //     SELECT * FROM hop_officers WHERE client_id = ?
// // // //   `,
// // // //   UPDATE_OFFICER: `
// // // //     UPDATE hop_officers
// // // //     SET name = ?, position = ?, phone = ?, email = ?
// // // //     WHERE officer_id = ?
// // // //   `,
// // // //   DELETE_OFFICER: `
// // // //     DELETE FROM hop_officers WHERE officer_id = ?
// // // //   `,

// // // //   // ===================== Combined =====================
// // // //   // Get Client + Sites + Officers in one query
// // // //  GET_ALL_CLIENTS_FULL: `
// // // //   SELECT 
// // // //     c.client_id, c.client_name, c.total_sites, c.created_at,
// // // //     s.site_id, s.location, s.deliverables, s.tentative_labours, s.labour_turnover, s.work_order,
// // // //     o.officer_id, o.name AS officer_name, o.position, o.phone, o.email
// // // //   FROM hop_clients c
// // // //   LEFT JOIN hop_sites s ON c.client_id = s.client_id
// // // //   LEFT JOIN hop_officers o ON c.client_id = o.client_id
// // // //   ORDER BY c.created_at DESC
// // // // `,

// // // // };
// // // module.exports = {
// // //   // ===================== Clients =====================
// // //   INSERT_CLIENT: `
// // //     INSERT INTO hop_clients (client_id, client_name, total_sites)
// // //     VALUES (?, ?, ?)
// // //   `,
// // //   GET_ALL_CLIENTS: `
// // //     SELECT * FROM hop_clients ORDER BY created_at DESC
// // //   `,
// // //   GET_CLIENT_BY_ID: `
// // //     SELECT 
// // //       c.client_id, c.client_name, c.total_sites, c.created_at,
// // //       s.site_id, s.location, s.deliverables, s.tentative_labours, s.labour_turnover, s.work_order,
// // //       o.officer_id, o.name AS officer_name, o.position, o.phone, o.email
// // //     FROM hop_clients c
// // //     LEFT JOIN hop_sites s ON c.client_id = s.client_id
// // //     LEFT JOIN hop_officers o ON c.client_id = o.client_id
// // //     WHERE c.client_id = ?
// // //   `,
// // //   UPDATE_CLIENT: `
// // //     UPDATE hop_clients
// // //     SET client_name = ?, total_sites = ?
// // //     WHERE client_id = ?
// // //   `,
// // //   DELETE_CLIENT: `
// // //     DELETE FROM hop_clients WHERE client_id = ?
// // //   `,

// // //   // ===================== Sites =====================
// // //   INSERT_SITE: `
// // //     INSERT INTO hop_sites (client_id, location, deliverables, tentative_labours, labour_turnover, work_order)
// // //     VALUES (?, ?, ?, ?, ?, ?)
// // //   `,
// // //   GET_SITES_BY_CLIENT: `
// // //     SELECT * FROM hop_sites WHERE client_id = ?
// // //   `,
// // //   UPDATE_SITE: `
// // //     UPDATE hop_sites
// // //     SET location = ?, deliverables = ?, tentative_labours = ?, labour_turnover = ?, work_order = ?
// // //     WHERE site_id = ?
// // //   `,
// // //   DELETE_SITE: `
// // //     DELETE FROM hop_sites WHERE site_id = ?
// // //   `,

// // //   // ===================== Officers =====================
// // //   INSERT_OFFICER: `
// // //     INSERT INTO hop_officers (client_id, name, position, phone, email)
// // //     VALUES (?, ?, ?, ?, ?)
// // //   `,
// // //   GET_OFFICERS_BY_CLIENT: `
// // //     SELECT * FROM hop_officers WHERE client_id = ?
// // //   `,
// // //   UPDATE_OFFICER: `
// // //     UPDATE hop_officers
// // //     SET name = ?, position = ?, phone = ?, email = ?
// // //     WHERE officer_id = ?
// // //   `,
// // //   DELETE_OFFICER: `
// // //     DELETE FROM hop_officers WHERE officer_id = ?
// // //   `,

// // //   // ===================== Combined =====================
// // //   GET_ALL_CLIENTS_FULL: `
// // //     SELECT 
// // //       c.client_id, c.client_name, c.total_sites, c.created_at,
// // //       s.site_id, s.location, s.deliverables, s.tentative_labours, s.labour_turnover, s.work_order,
// // //       o.officer_id, o.name AS officer_name, o.position, o.phone, o.email
// // //     FROM hop_clients c
// // //     LEFT JOIN hop_sites s ON c.client_id = s.client_id
// // //     LEFT JOIN hop_officers o ON c.client_id = o.client_id
// // //     ORDER BY c.created_at DESC
// // //   `,
// // // };
// // module.exports = {
// //   // ===================== Clients =====================
// //   INSERT_CLIENT: `
// //     INSERT INTO hop_clients (client_code, client_name, total_sites)
// //     VALUES (?, ?, ?)
// //   `,
// //   GET_ALL_CLIENTS: `
// //     SELECT client_id, client_code, client_name, total_sites, created_at 
// //     FROM hop_clients 
// //     ORDER BY created_at DESC
// //   `,
// //   GET_CLIENT_BY_ID: `
// //     SELECT 
// //       c.client_id, c.client_code, c.client_name, c.total_sites, c.created_at,
// //       s.site_id, s.location, s.deliverables, s.tentative_labours, s.labour_turnover, s.work_order,
// //       o.officer_id, o.name AS officer_name, o.position, o.phone, o.email
// //     FROM hop_clients c
// //     LEFT JOIN hop_sites s ON c.client_id = s.client_id
// //     LEFT JOIN hop_officers o ON c.client_id = o.client_id
// //     WHERE c.client_id = ?
// //   `,
// //   UPDATE_CLIENT: `
// //     UPDATE hop_clients
// //     SET client_name = ?, total_sites = ?
// //     WHERE client_id = ?
// //   `,
// //   DELETE_CLIENT: `
// //     DELETE FROM hop_clients WHERE client_id = ?
// //   `,

// //   // ===================== Sites =====================
// //   INSERT_SITE: `
// //     INSERT INTO hop_sites (client_id, location, deliverables, tentative_labours, labour_turnover, work_order)
// //     VALUES (?, ?, ?, ?, ?, ?)
// //   `,
// //   GET_SITES_BY_CLIENT: `
// //     SELECT * FROM hop_sites WHERE client_id = ?
// //   `,
// //   UPDATE_SITE: `
// //     UPDATE hop_sites
// //     SET location = ?, deliverables = ?, tentative_labours = ?, labour_turnover = ?, work_order = ?
// //     WHERE site_id = ?
// //   `,
// //   DELETE_SITE: `
// //     DELETE FROM hop_sites WHERE site_id = ?
// //   `,

// //   // ===================== Officers =====================
// //   INSERT_OFFICER: `
// //     INSERT INTO hop_officers (client_id, name, position, phone, email)
// //     VALUES (?, ?, ?, ?, ?)
// //   `,
// //   GET_OFFICERS_BY_CLIENT: `
// //     SELECT * FROM hop_officers WHERE client_id = ?
// //   `,
// //   UPDATE_OFFICER: `
// //     UPDATE hop_officers
// //     SET name = ?, position = ?, phone = ?, email = ?
// //     WHERE officer_id = ?
// //   `,
// //   DELETE_OFFICER: `
// //     DELETE FROM hop_officers WHERE officer_id = ?
// //   `,

// //   // ===================== Combined =====================
// //   GET_ALL_CLIENTS_FULL: `
// //     SELECT 
// //       c.client_id, c.client_code, c.client_name, c.total_sites, c.created_at,
// //       s.site_id, s.location, s.deliverables, s.tentative_labours, s.labour_turnover, s.work_order,
// //       o.officer_id, o.name AS officer_name, o.position, o.phone, o.email
// //     FROM hop_clients c
// //     LEFT JOIN hop_sites s ON c.client_id = s.client_id
// //     LEFT JOIN hop_officers o ON c.client_id = o.client_id
// //     ORDER BY c.created_at DESC
// //   `,
// // };


// /////////////////



// exports.INSERT_CLIENT = `
//   INSERT INTO hop_clients (client_id, client_name, total_sites)
//   VALUES (?, ?, ?)
// `;

// exports.INSERT_SITE = `
//   INSERT INTO hop_sites (client_id, site_name, location, deliverables, tentative_labours, labour_turnover, work_order)
//   VALUES (?, ?, ?, ?, ?, ?, ?)
// `;

// exports.INSERT_OFFICER = `
//   INSERT INTO hop_officers (client_id, name, position, phone, email)
//   VALUES (?, ?, ?, ?, ?)
// `;

// // constants/clientQueries.js
// // constants/clientQueries.js
// exports.GET_ALL_CLIENTS_FULL = `
// SELECT 
//   c.client_id,
//   c.client_name,
//   c.total_sites,
//   c.created_at,
//   s.site_id,
//   s.site_name,
//   s.location,
//   s.deliverables,
//   s.tentative_labours,
//   s.labour_turnover,
//   s.work_order,
//   o.officer_id,
//   o.name AS officer_name,
//   o.position,
//   o.phone,
//   o.email
// FROM hop_clients c
// LEFT JOIN hop_sites s ON c.client_id = s.client_id
// LEFT JOIN hop_officers o ON c.client_id = o.client_id;
// `;

// exports.GET_CLIENT_BY_ID = `
// SELECT 
//   c.client_id,
//   c.client_name,
//   c.total_sites,
//   c.created_at,
//   s.site_id,
//   s.site_name,
//   s.location,
//   s.deliverables,
//   s.tentative_labours,
//   s.labour_turnover,
//   s.work_order,
//   o.officer_id,
//   o.name AS officer_name,
//   o.position,
//   o.phone,
//   o.email
// FROM hop_clients c
// LEFT JOIN hop_sites s ON c.client_id = s.client_id
// LEFT JOIN hop_officers o ON c.client_id = o.client_id
// WHERE c.client_id = ?;
// `;



// exports.UPDATE_CLIENT = `
//   UPDATE hop_clients SET client_name = ?, total_sites = ?
//   WHERE client_id = ?
// `;

// exports.DELETE_CLIENT = `
//   DELETE FROM hop_clients WHERE client_id = ?
// `;
// constants/clientQueries.js


exports.INSERT_CLIENT = `
  INSERT INTO hop_clients (client_id, client_name, total_sites)
  VALUES (?, ?, ?)
`;

exports.INSERT_SITE = `
  INSERT INTO hop_sites (client_id, site_name, location, deliverables, tentative_labours, labour_turnover, work_order)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

exports.INSERT_OFFICER = `
  INSERT INTO hop_officers (client_id, name, position, phone, email)
  VALUES (?, ?, ?, ?, ?)
`;

exports.GET_ALL_CLIENTS_FULL = `
SELECT 
  c.client_id,
  c.client_name,
  c.total_sites,
  c.created_at,
  s.site_id,
  s.site_name,
  s.location,
  s.deliverables,
  s.tentative_labours,
  s.labour_turnover,
  s.work_order,
  o.officer_id,
  o.name AS officer_name,
  o.position,
  o.phone,
  o.email
FROM hop_clients c
LEFT JOIN hop_sites s ON c.client_id = s.client_id
LEFT JOIN hop_officers o ON c.client_id = o.client_id
`;

exports.GET_CLIENT_BY_ID = `
SELECT 
  c.client_id,
  c.client_name,
  c.total_sites,
  c.created_at,
  s.site_id,
  s.site_name,
  s.location,
  s.deliverables,
  s.tentative_labours,
  s.labour_turnover,
  s.work_order,
  o.officer_id,
  o.name AS officer_name,
  o.position,
  o.phone,
  o.email
FROM hop_clients c
LEFT JOIN hop_sites s ON c.client_id = s.client_id
LEFT JOIN hop_officers o ON c.client_id = o.client_id
WHERE c.client_id = ?
`;

exports.UPDATE_CLIENT = `
  UPDATE hop_clients SET client_name = ?, total_sites = ?
  WHERE client_id = ?
`;

exports.DELETE_CLIENT = `
  DELETE FROM hop_clients WHERE client_id = ?
`;

exports.DELETE_SITES_BY_CLIENT = `
  DELETE FROM hop_sites WHERE client_id = ?
`;

exports.DELETE_OFFICERS_BY_CLIENT = `
  DELETE FROM hop_officers WHERE client_id = ?
`;