import jwt from "jsonwebtoken";
import data from "../const/const.js";

export const authenticateToken = (req, res, next) => {
  
  const rawToken = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const token = rawToken?.replace(/^"|"$/g, '');
  
  
  if (!token) {
    console.log("❌ authenticateToken - No token provided");
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, data.secret);
    console.log("🔐 authenticateToken - decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("❌ authenticateToken - Invalid token:", error.message);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Acceso prohibido: No tienes permiso para realizar esta acción",
      });
    }

    next();
  };
};