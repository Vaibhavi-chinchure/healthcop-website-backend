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
   CORS – NOW ALLOWS x-site-id AND x-user-id
   -------------------------------------------------------------- */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile / curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "x-site-id",
      "x-user-id"  // ← ADDED THIS LINE
    ],
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
