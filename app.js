const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Router = require("./Routes/Routes");
const socket = require("./socket");
const http = require("http");

app.use(express.json());

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(morgan("dev"));
socket(server);

app.use("/chitshat", Router);

module.exports = server;
