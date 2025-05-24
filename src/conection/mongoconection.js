// import mongoose from "mongoose";
// import data from "../const/const.js";

// Variable global para GridFS
// let gfs;

// export const getGfs = async () => {
//   const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000,
//     maxPoolSize: 10,
//   };

//   await mongoose.connect(data.database, options);
//   console.log("Conectado a MongoDB con éxito!");

//   const conn = mongoose.connection;

//   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "presentations",
//   });

//   if (!gfs) {
//     throw new Error("GridFS aún no está disponible.");
//   }
//   return gfs;
// };


// export const mongooseconection = async () => {
//   try {
//     // Opciones de conexión mejoradas
//     const options = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       maxPoolSize: 10,
//     };

//     await mongoose.connect(data.database, options);
//     console.log("Conectado a MongoDB con éxito!");

//     const conn = mongoose.connection;

//     // Configurar GridFS cuando la conexión esté abierta
//     conn.once("open", () => {
//       gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: "presentations",
//       });
//       console.log("GridFS configurado correctamente");
//     });

//     // Manejar errores de conexión
//     conn.on("error", (err) => {
//       console.error("Error de conexión MongoDB:", err);
//     });

//     // Manejar desconexiones
//     conn.on("disconnected", () => {
//       console.log("MongoDB desconectado, intentando reconectar...");
//       setTimeout(() => mongooseconection(), 5000);
//     });

//     // Manejar cierre de la aplicación
//     process.on("SIGINT", async () => {
//       await conn.close();
//       console.log("Conexión a MongoDB cerrada por finalización de la aplicación");
//       process.exit(0);
//     });
//   } catch (error) {
//     console.error("Error de conexión MongoDB:", error);
//     // Intentar reconectar después de un tiempo
//     console.log("Intentando reconectar en 5 segundos...");
//     setTimeout(() => mongooseconection(), 5000);
//   }
// };

import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import data from "../const/const.js";

let gfs = null;

export const getGfs = () => {
  if (!gfs) {
    throw new Error("GridFS aún no está inicializado. Llama a mongooseConnection() primero.");
  }
  return gfs;
};

export const mongooseConnection = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    };

    await mongoose.connect(data.database, options);
    console.log("✅ Conectado a MongoDB con éxito");

    const conn = mongoose.connection;

    conn.once("open", () => {
      gfs = new GridFSBucket(conn.db, {
        bucketName: "presentations",
      });
      console.log("📦 GridFS inicializado correctamente");
    });

    conn.on("error", (err) => {
      console.error("❌ Error de conexión MongoDB:", err);
    });

    conn.on("disconnected", () => {
      console.warn("⚠️ MongoDB desconectado, intentando reconectar...");
      setTimeout(() => mongooseConnection(), 5000);
    });

    process.on("SIGINT", async () => {
      await conn.close();
      console.log("🔌 Conexión cerrada por finalización de la aplicación");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error de conexión inicial:", error.message);
    console.log("⏳ Reintentando en 5 segundos...");
    setTimeout(() => mongooseConnection(), 5000);
  }
};
