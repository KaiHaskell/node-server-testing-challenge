const express = require("express");

const postRouter = require("../routers/posts/post-router");
const commentRouter = require("../routers/comments/comment-router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", postRouter);
server.use("/api/comments", commentRouter);

server.get("/", (req, res) => {
  res.json({ server: "Is running!" });
});

module.exports = server;
