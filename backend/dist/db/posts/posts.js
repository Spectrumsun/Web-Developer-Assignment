"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.createPost = exports.getPosts = void 0;
const uuid_1 = require("uuid");
const connection_1 = require("../connection");
const query_tamplates_1 = require("./query-tamplates");
const getPosts = (userId) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_tamplates_1.selectPostsTemplate, [userId], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getPosts = getPosts;
const createPost = (post) => {
    const id = (0, uuid_1.v4)();
    const created_at = new Date().toISOString();
    return new Promise((resolve, reject) => {
        connection_1.connection.run(query_tamplates_1.insertPostTemplate, [id, post.user_id, post.title, post.body, created_at], (err) => {
            if (err)
                return reject(err);
            resolve(Object.assign(Object.assign({}, post), { id, created_at }));
        });
    });
};
exports.createPost = createPost;
const deletePost = (postId) => {
    return new Promise((resolve, reject) => {
        connection_1.connection.run(query_tamplates_1.deletePostTemplate, [postId], (err) => {
            if (err)
                return reject(err);
            resolve();
        });
    });
};
exports.deletePost = deletePost;
