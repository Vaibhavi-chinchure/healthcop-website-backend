const GET_ALL_SITES = `
  SELECT site_id, site_name
  FROM healthcop.hop_sites
  ORDER BY site_name ASC;
`;

export { GET_ALL_SITES };
