

// middleware/upload.js
import multer from "multer";
import data from "../const/const.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: data.maxFileSize,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (data.allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no permitido."), false);
    }
  },
});

export default upload;


