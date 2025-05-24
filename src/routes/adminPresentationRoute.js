// src/routes/adminPresentationRoute.js
import express from "express";
import { PresentationController } from "../controller/presentationController.js";
import { handleUploadErrors } from "../middleware/handleUploadErrors.js";
import { authenticateToken } from "../middleware/auth.js";
import multer from "multer";
const adminPresentationRoute = express.Router();

// Middleware de autenticación para todas las rutas
adminPresentationRoute.use(authenticateToken);
const storage = multer.memoryStorage(); // usamos memoria temporal
const upload = multer({ storage });


// Rutas
adminPresentationRoute.post("/", authenticateToken,  upload.single('file'), PresentationController.createPresentation);
adminPresentationRoute.get("/", PresentationController.getPresentations);
adminPresentationRoute.get("/:id", PresentationController.getPresentation);
adminPresentationRoute.put("/:id", PresentationController.updatePresentation);
adminPresentationRoute.delete("/:id", PresentationController.deletePresentation);

export default adminPresentationRoute;