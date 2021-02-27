const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.evibd.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?authSource=admin&replicaSet=atlas-fqrrap-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("connection to db failed");
  });

app.use(bodyParser.json());

app.use("/images", express.static(path.join("express-backend/images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes)
app.use("/api/user", userRoutes);

module.exports = app;
