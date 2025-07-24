import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  // Log del error
  logger.error('Error en la aplicación:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Errores de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  // Errores de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido'
    });
  }

  // Errores de Multer
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'El archivo es demasiado grande'
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      error: 'Campo de archivo inesperado'
    });
  }

  // Error por defecto
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Error interno del servidor' 
    : err.message;

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}; 