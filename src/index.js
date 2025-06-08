import express from "express";
import router from "./router/router.js";
import cookieParser from "cookie-parser";
import { mongooseConnection } from "./conection/mongoconection.js";
import data from "./const/const.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Configuración de CORS (global)
app.use(
  cors({
    origin: data.allowRequest, // Permitir todos los orígenes para pruebas en Postman
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permitir cookies (necesario para access_token)
  }),
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas API
app.use("/api", router);

// Ruta raíz para confirmar que el servidor está corriendo
app.get("/", (req, res) => {
  res.status(200).json({ message: "Eventum API is running" });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: 'Error al subir el archivo',
      details: err.message
    });
  }
  
  res.status(500).json({
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
  });
});

// Iniciar el servidor solo si la conexión a MongoDB es exitosa
const startServer = async () => {
  try {
    await mongooseConnection(); // Conectar a MongoDB
    const PORT = data.port;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Detener el servidor si la conexión falla
  }
};

startServer();

export default app;