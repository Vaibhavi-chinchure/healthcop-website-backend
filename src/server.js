import serverless from "serverless-http";  // or require('serverless-http') if using CommonJS
import app from "./app.js";                // adjust path if needed

// Wrap Express app as a Vercel Serverless Function
export const handler = serverless(app);

// Optional default export (for local dev or testing)
export default app;
