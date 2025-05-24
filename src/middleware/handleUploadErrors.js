import { getGridFSBucket } from "../lib/gridfs.js";

export const handleUploadErrors = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se ha subido ningún archivo." });
  }

  try {
    const bucket = getGridFSBucket();
    if (!bucket) throw new Error("No se pudo inicializar GridFS");

    const mimetype = req.file.mimetype;
    let fileType = "other";
    if (mimetype.includes("pdf")) fileType = "pdf";
    else if (mimetype.includes("powerpoint")) fileType = "powerpoint";
    else if (mimetype.includes("word")) fileType = "word";

    const filename = `${Date.now()}_${req.file.originalname}`;

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        user: req.body.user || "anon",
        event: req.body.event || "sin evento",
        originalName: req.file.originalname,
        fileType,
        uploadDate: new Date(),
      },
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", () => {
      console.log("Archivo subido:", filename);
      res.status(200).json({ message: "Archivo subido con éxito", id: uploadStream.id });
    });

    uploadStream.on("error", (err) => {
      console.error("Error al subir:", err);
      res.status(500).json({ error: "Error al guardar el archivo." });
    });
  } catch (err) {
    console.error("Error general:", err);
    res.status(500).json({ error: err.message });
  }


};
