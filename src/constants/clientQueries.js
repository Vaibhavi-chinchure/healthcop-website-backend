export const INSERT_CLIENT = `
  INSERT INTO hop_clients (client_id, client_name, total_sites)
  VALUES (?, ?, ?)
`;

export const INSERT_SITE = `
  INSERT INTO hop_sites (client_id, site_name, location, deliverables, tentative_labours, labour_turnover, work_order)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

export const INSERT_OFFICER = `
  INSERT INTO hop_officers (client_id, name, position, phone, email)
  VALUES (?, ?, ?, ?, ?)
`;

export const GET_ALL_CLIENTS_FULL = `
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

export const GET_CLIENT_BY_ID = `
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

export const UPDATE_CLIENT = `
  UPDATE hop_clients SET client_name = ?, total_sites = ?
  WHERE client_id = ?
`;

export const DELETE_CLIENT = `
  DELETE FROM hop_clients WHERE client_id = ?
`;

export const DELETE_SITES_BY_CLIENT = `
  DELETE FROM hop_sites WHERE client_id = ?
`;

export const DELETE_OFFICERS_BY_CLIENT = `
  DELETE FROM hop_officers WHERE client_id = ?
`;
