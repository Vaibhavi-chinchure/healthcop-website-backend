// import dotenv from "dotenv";
// import app from "./app.js";

// dotenv.config(); // Load .env first

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


import serverless from "serverless-http";  // or require('serverless-http') if using CommonJS
import app from "./app.js";                // adjust path if needed

// Wrap Express app as a Vercel Serverless Function
export const handler = serverless(app);

// Optional default export (for local dev or testing)
export default app;
