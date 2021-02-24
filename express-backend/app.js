const express = require("express");

const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    { title: "first", content: "first content", id: "1" },
    { title: "second", content: "second content", id: "2" },
  ];
  res.status(200).json({
    message: 'posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
