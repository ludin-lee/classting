import "./src/config/env.js";
import http from "node:http";
import express from "express";
import cors from "cors";
import "./src/models/index.js";
import indexRouter from "./src/routes/index.router.js";

const { HTTP_PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).json({ code: 1, message: "Not found" });
});

http.createServer(app).listen(HTTP_PORT || 3000, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Listening on port " + HTTP_PORT);
});
