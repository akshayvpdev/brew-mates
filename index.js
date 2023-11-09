const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./config/DBconnection");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/ErrorController");

const app = express();
dotenv.config();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
db.connect();

app.use("/auth", require("./Routes/authRoutes"));
app.use("/profile", require("./Routes/profileRoutes"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
