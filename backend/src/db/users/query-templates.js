"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countPostsByUserIdTemplate = exports.selectUserByIdTemplate = exports.insertAdderTemplate = exports.selectAddersByUserIdTemplate = exports.selectCountOfUsersTemplate = exports.selectUsersTemplate = void 0;
exports.selectUsersTemplate = `
  SELECT *
  FROM users
  ORDER BY name
  LIMIT ?, ?
`;
exports.selectCountOfUsersTemplate = `
  SELECT COUNT(*) as count
  FROM users
`;
exports.selectAddersByUserIdTemplate = `
  SELECT key, value
  FROM user_adders
  WHERE user_id = ?;
`;
exports.insertAdderTemplate = `
  INSERT INTO user_adders (user_id, key, value)
  VALUES (?, ?, ?);
`;
exports.selectUserByIdTemplate = `
  SELECT *
  FROM users
  WHERE id = ?;
`;
exports.countPostsByUserIdTemplate = `
  SELECT COUNT(*) as total
  FROM posts
  WHERE user_id = ?;
`;
