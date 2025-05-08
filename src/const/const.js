// src/const/const.js
const data = {
  // agregar codigo de wpp
    port: process.env.PORT ,
    database: process.env.MONGODB_URI ,
    secret: process.env.JWT_SECRET ,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    tokenExpiry: process.env.TOKEN_EXPIRY ,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY ,
    environment: process.env.NODE_ENV ,
    allowedFileTypes: [
      // PDF
      "application/pdf",
      // PowerPoint
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      // Word
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // Excel (opcional)
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    maxFileSize: process.env.MAX_FILE_SIZE || 20 * 1024 * 1024, // 20MB por defecto
  };
  
  export default data;