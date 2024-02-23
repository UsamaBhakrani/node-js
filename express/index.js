const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const Joi = require("joi");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const express = require("express");
const app = express();
const helmet = require("helmet");
const courses = require("./routes/courses");
const home = require("./routes/home");

app.set("view engine", "pug");
app.set("views", "./views");

// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`APP_ENV:${app.get("env")}`);

// configuration

// console.log(config.get("name"));
// console.log(config.get("mail.host"));
// console.log(config.get("mail.password"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(helmet());

app.use("/api/courses", courses);
app.use("/", home);

if (app.get("env") === "production") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan Enabled");
}

// db Work
dbDebugger("Connected to the Database");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
