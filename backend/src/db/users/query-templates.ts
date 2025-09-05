export const selectUsersTemplate = `
  SELECT *
  FROM users
  ORDER BY name
  LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
  SELECT COUNT(*) as count
  FROM users
`;

export const selectAddersByUserIdTemplate = `
  SELECT key, value
  FROM user_adders
  WHERE user_id = ?;
`;

export const insertAdderTemplate = `
  INSERT INTO user_adders (user_id, key, value)
  VALUES (?, ?, ?);
`;



export const selectUserByIdTemplate = `
  SELECT *
  FROM users
  WHERE id = ?;
`;

export const countPostsByUserIdTemplate = `
  SELECT COUNT(*) as total
  FROM posts
  WHERE user_id = ?;
`;