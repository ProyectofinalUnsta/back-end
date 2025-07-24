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
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Configuración de CORS mejorada para producción
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://eventum.lat', 'https://www.eventum.lat'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  exposedHeaders: ['Content-Disposition']
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas API
app.use("/api", router);

// Ruta raíz para confirmar que el servidor está corriendo
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Eventum API is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Middleware de manejo de errores global
app.use(errorHandler);

// Iniciar el servidor solo si la conexión a MongoDB es exitosa
const startServer = async () => {
  try {
    await mongooseConnection(); // Conectar a MongoDB
    const PORT = data.port;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1); // Detener el servidor si la conexión falla
  }
};

if (process.env.NODE_ENV !== 'test') {
 startServer();
}

export default app;
