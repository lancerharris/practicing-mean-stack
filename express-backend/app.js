const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    { title: "first", content: "first content", id: "1" },
    { title: "second", content: "second content", id: "2" },
  ];
  res.status(200).json({
    message: "posts fetched successfully",
    posts: posts,
  });
});

module.exports = app;
