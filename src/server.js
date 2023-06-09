const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes/routes.js");
const cookieParser = require("cookie-parser");

const { DB_URL, PORT, NODE_ENV } = require("./config/config.js");

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // authSource: "admin",
  })
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );

    // Logs
    NODE_ENV === "production"
      ? app.use(morgan("common"))
      : app.use(morgan("dev"));

    // routes(app);
    app.use("/api/v1", router);
    app.use("/", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Auth API",
        description: "Auth API | Version 1",
      });
    });

    // Service initiated...
    app.listen(PORT, () => {
      console.log(`> Service running: http://0.0.0.0:${PORT}`);
    });
  });
