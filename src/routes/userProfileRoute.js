import express from "express";
import { UserController } from "../controller/userController.js";
import { authenticateToken } from "../middleware/auth.js";
import upload from "../middleware/Upload.js";

const router = express.Router();

// Endpoint de prueba
router.get("/test", (req, res) => {
  console.log("✅ Test endpoint hit");
  res.status(200).json({ message: "User profile routes working" });
});

// Obtener perfil del usuario
router.get("/profile", authenticateToken, UserController.getProfile);

// Actualizar perfil del usuario
router.put("/profile", authenticateToken, upload.single("profileImage"), UserController.updateProfile);

export default router; 