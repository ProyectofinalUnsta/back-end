import express from 'express';
import { uploadFile, getFiles, deleteFile, getFilesByMail } from '../controller/fileController.js';
import { upload } from '../controller/fileController.js';

const fileRoute = express.Router();

// Ruta para subir archivo
fileRoute.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        uploadFile(req, res);
    });
});

// Ruta para obtener archivos
fileRoute.get('/', getFiles);

fileRoute.get('/:mail', getFilesByMail);

// Ruta para eliminar archivo
fileRoute.delete('/:id', deleteFile);

export default fileRoute; 