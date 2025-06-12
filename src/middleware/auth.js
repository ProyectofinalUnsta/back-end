import jwt from "jsonwebtoken";
import data from "../const/const.js";

export const authenticateToken = (req, res, next) => {
  const rawToken = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
  const token = rawToken?.replace(/^"|"$/g, '');

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, data.secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message)
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