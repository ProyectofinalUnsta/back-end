// src/controller/presentationController.js
import Presentation from "../schema/PresentationSchema.js";
import mongoose from "mongoose";
import { getGridFSBucket } from "../lib/gridfs.js";
import mime from 'mime-types'
export class PresentationController {
  // Obtener todas las presentaciones
  static async getPresentations(req, res) {
    try {
      const presentations = await Presentation.find().populate("event");
      res.status(200).json(presentations);
    } catch (error) {
      console.error("Error al obtener presentaciones:", error);
      res.status(500).json({ error: error.message });
    }
  }
  
  static async getPresentationByMail(req,res) {
   try {
      const presentation = await Presentation.find({gmail:req.params.gmail}).populate("event");
      console.log(presentation)
      if (!presentation) {
        return res.status(404).json({ error: "Presentación no encontrada" });
      }
      res.status(200).json(presentation);
    } catch (error) {
      console.error("Error al obtener presentación:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una presentación por ID
  static async getPresentation(req, res) {
    try {
      const presentation = await Presentation.findById(req.params.id).populate("event");
      if (!presentation) {
        return res.status(404).json({ error: "Presentación no encontrada" });
      }
      res.status(200).json(presentation);
    } catch (error) {
      console.error("Error al obtener presentación:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Crear una nueva presentación


static async createPresentation(req, res) {
  try {
    const gfs = await getGridFSBucket();
    if (!gfs) {
      return res.status(500).json({ error: "GridFS no está disponible aún" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No se ha enviado ningún archivo" });
    }

    const { user, event, format, description, gmail } = req.body;

    if (!user || !event || !format || !gmail) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
        received: { user, event, format , gmail },
      });
    }

    const { originalname, mimetype, size, buffer } = req.file;
    const uploadStream = gfs.openUploadStream(originalname, {
      contentType: mimetype,
      metadata: { uploadedBy: user },
    });

    // Prevenir múltiples respuestas
    let responded = false;

    uploadStream.on("error", (err) => {
      if (!responded) {
        responded = true;
        console.error("Error subiendo archivo:", err);
        return res.status(500).json({ error: "Error al subir el archivo a GridFS" });
      }
    });



    uploadStream.on("finish", async () => {
      try {

        const presentation = new Presentation({
          user,
          event,
          format,
          originalName: originalname,
          filename: uploadStream.filename,
          fileSize: size,
          fileType: mimetype,
          uploadDate: new Date(),
          fileId: uploadStream.id,
          description: description || '',
          gmail:gmail
        });

        const savedPresentation = await presentation.save();

        if (!responded) {
          responded = true;
          return res.status(201).json({
            message: "Presentación subida exitosamente",
            presentation: savedPresentation
          });
        }
      } catch (err) {
        if (!responded) {
          responded = true;
          console.error("Error al guardar la presentación:", err);
          return res.status(500).json({ error: err.message });
        }
      }
    });

    uploadStream.end(buffer);

  } catch (error) {
    console.error("Error al crear presentación:", error);
    return res.status(500).json({ error: error.message });
  }
}

  // Obtener presentaciones por evento
  static async getPresentationsByEvent(req, res) {
    try {
      const eventId = req.params.eventId;
      const presentations = await Presentation.find({ event: eventId });
      res.status(200).json(presentations);
    } catch (error) {
      console.error("Error al obtener presentaciones por evento:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Descargar una presentación
  static async downloadPresentation(req, res) {
    try {
      const presentation = await Presentation.findById(req.params.id);
      if (!presentation) {
        return res.status(404).json({ error: "Presentación no encontrada" });
      }

      const gfs = getGridFSBucket();
      if (!gfs) {
        return res.status(500).json({ error: "Error en el sistema de archivos" });
      }

      const fileId = new mongoose.Types.ObjectId(presentation.fileId);

      // Incrementar contador de descargas
      presentation.downloads = (presentation.downloads || 0) + 1;
      await presentation.save();

      // Configurar headers para descarga
      res.set("Content-Disposition", `attachment; filename="${presentation.originalName}"`);
      const contentType = mime.lookup(presentation.originalName) || "application/octet-stream";
       res.set("Content-Type", contentType);

      const downloadStream = gfs.openDownloadStream(fileId);
      
   downloadStream.on("error", (error) => {
  console.error("Error en stream:", error);
  res.set("Content-Type", "application/json");
  res.status(404).end(JSON.stringify({ error: "Archivo no encontrado" }));
});

      downloadStream.pipe(res);
    } catch (error) {
      console.error("Error al descargar presentación:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Actualizar una presentación
  static async updatePresentation(req, res) {
    try {
      const { description, tags, status } = req.body;
      
      const updateData = {};
      if (description !== undefined) updateData.description = description;
      if (tags !== undefined) updateData.tags = tags.split(",").map(tag => tag.trim());
      if (status !== undefined) updateData.status = status;
      
      const presentation = await Presentation.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!presentation) {
        return res.status(404).json({ error: "Presentación no encontrada" });
      }

      res.status(200).json({ 
        message: "Presentación actualizada exitosamente", 
        presentation 
      });
    } catch (error) {
      console.error("Error al actualizar presentación:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar una presentación
  static async deletePresentation(req, res) {
    try {
      const presentation = await Presentation.findById(req.params.id);
      if (!presentation) {
        return res.status(404).json({ error: "Presentación no encontrada" });
      }

      // Eliminar archivo de GridFS
      const gfs = getGridFSBucket();
      if (gfs) {
        try {
          await gfs.delete(new mongoose.Types.ObjectId(presentation.fileId));
        } catch (error) {
          console.error("Error al eliminar archivo de GridFS:", error);
          // Continuar con la eliminación del documento aunque falle la eliminación del archivo
        }
      }

      // Eliminar documento de presentación
      await Presentation.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Presentación eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar presentación:", error);
      res.status(500).json({ error: error.message });
    }
  }
}