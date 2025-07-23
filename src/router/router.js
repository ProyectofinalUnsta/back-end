import express from "express";
import userRoute from "../routes/userRoute.js";
import adminRoute from "../routes/adminRoute.js";
import presentationRoute from "../routes/presentationRoute.js";
import adminPresentationRoute from "../routes/adminPresentationRoute.js";
import authRoute from "../routes/authRoute.js";
import fileRoute from "../routes/fileRoute.js";
import InscriptosRoute from "../routes/InscriptosRoute.js";
import DisertanteRoute from "../routes/DisertanteRoute.js";
import userProfileRoute from "../routes/userProfileRoute.js";
import data from "../const/const.js";
import DownloadRoute from "../routes/downloadsRoute.js";
import eventRoute from "../routes/eventRoute.js";
const router = express.Router();

// Verificar que data.secret esté definido
if (!data.secret) {
  console.error("Error: JWT secret is not defined in const.js");
  process.exit(1);
}

// Middleware de logging para debuggear
router.use((req, res, next) => {
  console.log(`🔍 Router - ${req.method} ${req.path}`);
  next();
});

// Montar las rutas
router.use("/eventos", userRoute);
router.use('/disertante',DisertanteRoute)
router.use("/admin", adminRoute);
router.use("/presentations", presentationRoute);
router.use("/admin/presentations", adminPresentationRoute);
router.use("/auth", authRoute);
router.use("/files", fileRoute);
router.use('/inscriptos',InscriptosRoute);
router.use('/descargas',DownloadRoute);
router.use('/eventos',eventRoute);
router.use('/user', userProfileRoute);

// Ruta de prueba para verificar que el router funciona
router.get("/test", (req, res) => {
  console.log("✅ Router test endpoint hit");
  res.status(200).json({ message: "Router working" });
});

export default router;