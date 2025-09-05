"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { connection } from "./connection";
const connection_1 = require("./db/connection");
const createUserAddersTable = `
CREATE TABLE IF NOT EXISTS user_adders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;
connection_1.connection.run(createUserAddersTable, (err) => {
    if (err) {
        console.error("Failed to create table:", err);
    }
    else {
        console.log("user_adders table created successfully!");
    }
});
