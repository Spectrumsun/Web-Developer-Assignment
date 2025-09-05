import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
  selectAddersByUserIdTemplate,
  insertAdderTemplate,
  selectUserByIdTemplate,
  countPostsByUserIdTemplate,
} from "./query-templates";
import { User, Adder } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

// export const getUsers = (
//   pageNumber: number,
//   pageSize: number
// ): Promise<User[]> =>
//   new Promise((resolve, reject) => {
//     connection.all<User>(
//       selectUsersTemplate,
//       [pageNumber * pageSize, pageSize],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         }
//         resolve(results);
//       }
//     );
//   });


export const addUserAdder = (
  userId: number,
  adder: Adder
): Promise<void> => {
  return new Promise((resolve, reject) => {
    connection.run(
      insertAdderTemplate,
      [userId, adder.key, adder.value],
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};


const getAddersForUser = (userId: number): Promise<Adder[]> => {
  return new Promise((resolve, reject) => {
    connection.all<Adder>(selectAddersByUserIdTemplate, [userId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};


export const getUsers = async (pageNumber: number, pageSize: number): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    connection.all<User>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      async (error, users) => {
        if (error) return reject(error);

        try {
          const usersWithAdders = await Promise.all(
            users.map(async (user) => {
              const adders: Adder[] = await new Promise((res, rej) => {
                connection.all<Adder>(selectAddersByUserIdTemplate, [user.id], (err, rows) => {
                  if (err) return rej(err);
                  res(rows);
                });
              });
              return { ...user, adders };
            })
          );

          resolve(usersWithAdders);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};


export const getUserWithPostCount = (id: string): Promise<User & { totalPosts: number }> => {
  return new Promise((resolve, reject) => {
    connection.get<User>(selectUserByIdTemplate, [id], (err, user) => {
      if (err) return reject(err);
      if (!user) return reject(new Error("User not found"));

      connection.get<{ total: number }>(countPostsByUserIdTemplate, [id], (err2, countResult) => {
        if (err2) return reject(err2);

        resolve({ ...user, totalPosts: countResult?.total || 0 });
      });
    });
  });
};