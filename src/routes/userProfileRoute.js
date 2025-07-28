import express from "express";
import { UserController } from "../controller/userController.js";
import { authenticateToken } from "../middleware/auth.js";
import upload from "../middleware/Upload.js";

const router = express.Router();


// Obtener perfil del usuario
router.get("/profile", authenticateToken, UserController.getProfile);

// Actualizar perfil del usuario
router.put("/profile", authenticateToken, upload.single("image"), UserController.updateProfile);

export default router; 