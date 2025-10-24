export const INSERT_USER = `
  INSERT INTO hop_users (email, password, role)
  VALUES (?, ?, ?)
`;

export const FIND_USER_BY_EMAIL = `
  SELECT * FROM hop_users WHERE email = ?
`;
