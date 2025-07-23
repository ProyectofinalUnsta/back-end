import User from "../schema/UserSchema.js";
import { converterController } from "./converterController.js";

export class UserController {
  // Obtener perfil del usuario
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const responseData = {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          displayName: user.displayName || user.username,
          profileImage: user.profileImage,
        }
      };
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // Actualizar perfil del usuario
  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { displayName } = req.body;
      const updateData = {};
      // Actualizar nombre de visualización si se proporciona
      if (displayName && displayName.trim()) {
        updateData.displayName = displayName.trim();
      }
      // Si hay un archivo de imagen, procesarlo
      if (req.file) {
        try {
          const uploadResult = await converterController(req.file);
          if (uploadResult && uploadResult.url) {
            updateData.profileImage = uploadResult.url;
          } else {
            return res.status(500).json({ error: "Error al procesar la imagen" });
          }
        } catch (imageError) {
          return res.status(500).json({ error: "Error al procesar la imagen de perfil" });
        }
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, select: '-password' }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const responseData = {
        message: "Perfil actualizado exitosamente",
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,
          displayName: updatedUser.displayName || updatedUser.username,
          profileImage: updatedUser.profileImage,
        }
      };
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
} 