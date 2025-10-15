const GET_ALL_SITES = `
  SELECT site_id, site_name
  FROM healthcop.hop_sites
  ORDER BY site_name ASC;
`;

module.exports = { GET_ALL_SITES };
