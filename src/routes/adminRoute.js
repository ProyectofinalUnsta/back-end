import express from "express";
import { eventController } from "../controller/eventController.js";
import { authenticateToken } from "../middleware/auth.js";

const adminRoute = express.Router();

// Middleware de autenticación para todas las rutas de /admin
adminRoute.use(authenticateToken);

// Rutas
adminRoute.get("/", eventController.getEventos);
adminRoute.post("/", eventController.postEventos);
adminRoute.get("/:id", eventController.getEventoById);
adminRoute.put("/:id", eventController.updateEvento);
adminRoute.delete("/:id", eventController.deleteEvento);

export default adminRoute;