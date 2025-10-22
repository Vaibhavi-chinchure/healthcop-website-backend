const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const doctorNurseRoutes = require("./routes/doctorNurseRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const nursePreEmploymentRoutes = require("./routes/nursePreEmploymentRoute"); // ✅ Add this
const loginRoutes = require("./routes/loginRoute");
const siteRoutes = require("./routes/siteRoutes");
const PreEmploymentRoutes = require("./routes/preEmploymentRoutes");
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Mount routes
app.use("/api", routes);
app.use("/api/doctor-nurse", doctorNurseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/nurse-pre-employment", nursePreEmploymentRoutes); // ✅ Add this line
app.use("/api", loginRoutes);
app.use("/api", siteRoutes);
app.use("/api/pre-employment", PreEmploymentRoutes);
app.use('/attendance', attendanceRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Global error middleware at the end
app.use(errorMiddleware);

module.exports = app;
