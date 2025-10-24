import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authMiddleware(allowedRoles) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // ✅ Allow multiple roles
      if (allowedRoles) {
        // Convert single string to array
        const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        if (!rolesArray.includes(decoded.role)) {
          return res.status(403).json({ message: "Forbidden" });
        }
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
}

export default authMiddleware;
