"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWithPostCount = exports.getUsers = exports.addUserAdder = exports.getUsersCount = void 0;
const connection_1 = require("../connection");
const query_templates_1 = require("./query-templates");
const getUsersCount = () => new Promise((resolve, reject) => {
    connection_1.connection.get(query_templates_1.selectCountOfUsersTemplate, (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results.count);
    });
});
exports.getUsersCount = getUsersCount;
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
const addUserAdder = (userId, adder) => {
    return new Promise((resolve, reject) => {
        connection_1.connection.run(query_templates_1.insertAdderTemplate, [userId, adder.key, adder.value], (err) => {
            if (err)
                return reject(err);
            resolve();
        });
    });
};
exports.addUserAdder = addUserAdder;
const getAddersForUser = (userId) => {
    return new Promise((resolve, reject) => {
        connection_1.connection.all(query_templates_1.selectAddersByUserIdTemplate, [userId], (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
};
const getUsers = (pageNumber, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        connection_1.connection.all(query_templates_1.selectUsersTemplate, [pageNumber * pageSize, pageSize], (error, users) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                return reject(error);
            try {
                const usersWithAdders = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
                    const adders = yield new Promise((res, rej) => {
                        connection_1.connection.all(query_templates_1.selectAddersByUserIdTemplate, [user.id], (err, rows) => {
                            if (err)
                                return rej(err);
                            res(rows);
                        });
                    });
                    return Object.assign(Object.assign({}, user), { adders });
                })));
                resolve(usersWithAdders);
            }
            catch (err) {
                reject(err);
            }
        }));
    });
});
exports.getUsers = getUsers;
const getUserWithPostCount = (id) => {
    return new Promise((resolve, reject) => {
        connection_1.connection.get(query_templates_1.selectUserByIdTemplate, [id], (err, user) => {
            if (err)
                return reject(err);
            if (!user)
                return reject(new Error("User not found"));
            connection_1.connection.get(query_templates_1.countPostsByUserIdTemplate, [id], (err2, countResult) => {
                if (err2)
                    return reject(err2);
                resolve(Object.assign(Object.assign({}, user), { totalPosts: (countResult === null || countResult === void 0 ? void 0 : countResult.total) || 0 }));
            });
        });
    });
};
exports.getUserWithPostCount = getUserWithPostCount;
