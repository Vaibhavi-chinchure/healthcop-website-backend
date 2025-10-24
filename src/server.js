import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(); // Load .env first

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
