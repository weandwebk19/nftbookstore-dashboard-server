const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const route = require("./app/routes");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const session = require("express-session");
const moongoose = require("mongoose");
const cors = require("cors");
// const rediscl = require("./app/redis");

const app = express();
dotenv.config({ path: ".env" });

//Connect to db
moongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Connect to redis
// rediscl.on("connect", function () {
//   console.log("Redis plugged in.");
// });
// rediscl.on("error", (err) => console.log("Redis Client Error", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_BASE_URL,
  })
);

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

//Route init
route(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respone the error status
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
