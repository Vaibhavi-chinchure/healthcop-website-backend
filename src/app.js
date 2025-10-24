// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const routes = require("./routes");
// const { errorMiddleware } = require("./middlewares/errorMiddleware");
// const doctorNurseRoutes = require("./routes/doctorNurseRoutes");
// const authRoutes = require("./routes/authRoutes");
// const clientRoutes = require("./routes/clientRoutes");
// const nursePreEmploymentRoutes = require("./routes/nursePreEmploymentRoute"); // ✅ Add this
// const loginRoutes = require("./routes/loginRoute");
// const siteRoutes = require("./routes/siteRoutes");
// const PreEmploymentRoutes = require("./routes/preEmploymentRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// // Mount routes
// app.use("/api", routes);
// app.use("/api/doctor-nurse", doctorNurseRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/clients", clientRoutes);
// app.use("/api/nurse-pre-employment", nursePreEmploymentRoutes); // ✅ Add this line
// app.use("/api", loginRoutes);
// app.use("/api", siteRoutes);
// app.use("/api/pre-employment", PreEmploymentRoutes);

// // Global error middleware at the end
// app.use(errorMiddleware);

// module.exports = app;
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import doctorNurseRoutes from "./routes/doctorNurseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import nursePreEmploymentRoutes from "./routes/nursePreEmploymentRoute.js";
import loginRoutes from "./routes/loginRoute.js";
import siteRoutes from "./routes/siteRoutes.js";
import PreEmploymentRoutes from "./routes/preEmploymentRoutes.js";

import { fileURLToPath } from "url";

// 🔧 __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Mount routes
app.use("/api", routes);
app.use("/api/doctor-nurse", doctorNurseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/nurse-pre-employment", nursePreEmploymentRoutes);
app.use("/api", loginRoutes);
app.use("/api", siteRoutes);
app.use("/api/pre-employment", PreEmploymentRoutes);

// Global error middleware at the end
app.use(errorMiddleware);

export default app;