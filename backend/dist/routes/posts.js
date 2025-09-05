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
const express_1 = require("express");
const posts_1 = require("../db/posts/posts");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.query.userId) === null || _a === void 0 ? void 0 : _a.toString();
    if (!userId) {
        res.status(400).send({ error: "userId is required" });
        return;
    }
    const posts = yield (0, posts_1.getPosts)(userId);
    res.send(posts);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, title, body } = req.body;
    if (!user_id || !title || !body) {
        res.status(400).send({
            error: "user_id, title and body required"
        });
        return;
    }
    try {
        const newPost = yield (0, posts_1.createPost)({ user_id, title, body });
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).send({ error: "Failed to create post" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        if (!postId) {
            res.status(400).send({ error: "postId is required" });
            return;
        }
        yield (0, posts_1.deletePost)(postId);
        res.send({ message: "Post deleted successfully" });
    }
    catch (err) {
        res.status(500).send({ error: "Failed to delete post" });
    }
}));
exports.default = router;
