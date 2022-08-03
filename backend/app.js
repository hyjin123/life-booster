const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const isUserAuthRouter = require("./routes/isUserAuth");
const taskRouter = require("./routes/task");

// Back-End Routes
app.use("/register", registerRouter(db));
app.use("/login", loginRouter(db));
app.use("/isUserAuth", isUserAuthRouter(db));
app.use("/task", taskRouter(db));

module.exports = app;
