import axios from "axios"
import FormData from "form-data"
import path from "path"
import { fileURLToPath } from 'url'
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const converterController = async (imagen) => {
  try {
    console.log("🖼️ converterController - processing image:", imagen.originalname);
    
    // Intentar usar el servicio externo primero
    try {
      const form = new FormData()

      form.append('image', imagen.buffer, {
        filename: imagen.originalname || 'archivo.webp',       
        contentType: imagen.mimetype || 'image/webp'           
      })
        
      const response = await axios.post('https://convertidor-webp-service.onrender.com/upload', form, {
        headers: form.getHeaders(),
        timeout: 10000 // 10 segundos de timeout
      })
      
      console.log("🖼️ converterController - response status:", response.status);
      console.log("🖼️ converterController - response data:", response.data);
      
      if (response.status === 200 && response.data && response.data.url) {
        return response.data;
      }
    } catch (externalError) {
      console.error("❌ converterController - External service failed:", externalError.message);
      console.log("🔄 converterController - Falling back to local storage...");
    }

    // Fallback: guardar localmente
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    // Crear directorio si no existe
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const randomId = Math.floor(Math.random() * 1000000);
    const extension = path.extname(imagen.originalname) || '.jpg';
    const filename = `${timestamp}-${randomId}${extension}`;
    const filepath = path.join(uploadsDir, filename);

    // Guardar el archivo
    fs.writeFileSync(filepath, imagen.buffer);
    
    console.log("✅ converterController - File saved locally:", filename);
    
    // Retornar URL local
    return {
      url: `http://localhost:3001/uploads/${filename}`,
      filename: filename
    };

  } catch (err) {
    console.error('❌ converterController - Error al procesar imagen:', err.message);
    throw new Error("Error al procesar la imagen");
  }
}
