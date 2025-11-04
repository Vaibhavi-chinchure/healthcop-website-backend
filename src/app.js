// // // const express = require("express");
// // // const cors = require("cors");
// // // const path = require("path");
// // // const routes = require("./routes");
// // // const { errorMiddleware } = require("./middlewares/errorMiddleware");
// // // const doctorNurseRoutes = require("./routes/doctorNurseRoutes");
// // // const authRoutes = require("./routes/authRoutes");
// // // const clientRoutes = require("./routes/clientRoutes");
// // // const nursePreEmploymentRoutes = require("./routes/nursePreEmploymentRoute"); // ✅ Add this
// // // const loginRoutes = require("./routes/loginRoute");
// // // const siteRoutes = require("./routes/siteRoutes");
// // // const PreEmploymentRoutes = require("./routes/preEmploymentRoutes");

// // // const app = express();

// // // app.use(cors());
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Serve uploads folder
// // // app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// // // // Mount routes
// // // app.use("/api", routes);
// // // app.use("/api/doctor-nurse", doctorNurseRoutes);
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/clients", clientRoutes);
// // // app.use("/api/nurse-pre-employment", nursePreEmploymentRoutes); // ✅ Add this line
// // // app.use("/api", loginRoutes);
// // // app.use("/api", siteRoutes);
// // // app.use("/api/pre-employment", PreEmploymentRoutes);

// // // // Global error middleware at the end
// // // app.use(errorMiddleware);

// // // module.exports = app;
// // import express from "express";
// // import cors from "cors";
// // import path from "path";
// // import cookieParser from "cookie-parser";
// // import routes from "./routes/index.js";
// // import { errorMiddleware } from "./middlewares/errorMiddleware.js";
// // import doctorNurseRoutes from "./routes/doctorNurseRoutes.js";
// // import authRoutes from "./routes/authRoutes.js";
// // import clientRoutes from "./routes/clientRoutes.js";
// // import nursePreEmploymentRoutes from "./routes/nursePreEmploymentRoute.js";
// // import loginRoutes from "./routes/loginRoute.js";
// // import siteRoutes from "./routes/siteRoutes.js";
// // import PreEmploymentRoutes from "./routes/preEmploymentRoutes.js";

// // import { fileURLToPath } from "url";

// // // 🔧 __dirname replacement for ES modules
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const app = express();

// // app.use(cors({
// //   origin: 'http://localhost:3000',
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   credentials: true
// // }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // // ✅ Step 3: Serve static files
// // app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// // // ✅ Step 4: Routes
// // app.use("/api", routes);
// // app.use("/api/doctor-nurse", doctorNurseRoutes);
// // app.use("/api/auth", authRoutes);
// // app.use("/api/clients", clientRoutes);
// // app.use("/api/nurse-pre-employment", nursePreEmploymentRoutes);
// // app.use("/api", loginRoutes);
// // app.use("/api", siteRoutes);
// // app.use("/api/pre-employment", PreEmploymentRoutes);
// // app.get("/health", (req, res) => {
// //   res.status(200).json({ status: "ok", message: "Server is healthy ✅" });
// // });

// // // ✅ Step 5: Global error middleware
// // app.use(errorMiddleware);

// // module.exports = app;


// import express from "express";
// import cors from "cors";
// import path from "path";
// import cookieParser from "cookie-parser";
// import routes from "./routes/index.js";
// import { errorMiddleware } from "./middlewares/errorMiddleware.js";
// import doctorNurseRoutes from "./routes/doctorNurseRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import clientRoutes from "./routes/clientRoutes.js";
// import nursePreEmploymentRoutes from "./routes/nursePreEmploymentRoute.js";
// import loginRoutes from "./routes/loginRoute.js";
// import siteRoutes from "./routes/siteRoutes.js";
// import PreEmploymentRoutes from "./routes/preEmploymentRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import { fileURLToPath } from "url";

// // 🔧 __dirname replacement for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://healthcop-website.vercel.app",
//   "https://healthcop-website-frontend.onrender.com"
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true); // allow curl/postman
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       console.warn(`❌ Blocked CORS request from: ${origin}`);
//       return callback(new Error("Not allowed by CORS"));
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ✅ Step 2: Serve static files
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// // ✅ Step 3: Routes
// app.use("/api", routes);
// app.use("/api/doctor-nurse", doctorNurseRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/clients", clientRoutes);
// app.use("/api/nurse-pre-employment", nursePreEmploymentRoutes);
// app.use("/api", loginRoutes);
// app.use("/api", siteRoutes);
// app.use("/api/pre-employment", PreEmploymentRoutes);
// app.use("/attendance", attendanceRoutes);
// // Global error middleware at the end
// app.use(errorMiddleware);

// export default app;
// server.js  (or wherever you create the Express app)

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
import attendanceRoutes from "./routes/attendanceRoutes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = [
  "http://localhost:4000",
  "http://localhost:3000",
  "https://healthcop-website.vercel.app",
  "https://healthcop-website-frontend.onrender.com",
];

/* --------------------------------------------------------------
   CORS – the ONLY thing you have to change
   -------------------------------------------------------------- */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);               // mobile / curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,

    // <-- THIS LINE ALLOWS YOUR CUSTOM HEADER
    allowedHeaders: ["Authorization", "Content-Type", "x-site-id"],
  })
);

/* --------------------------------------------------------------
   The rest of your middleware stays exactly the same
   -------------------------------------------------------------- */
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
app.use("/attendance", attendanceRoutes);

// Global error middleware
app.use(errorMiddleware);

export default app;
