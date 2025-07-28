import axios from "axios"
import FormData from "form-data"

export const converterController = async (imagen) => {
  try { 
    // Intentar usar el servicio externo primero
    try {
      const form = new FormData()

      form.append('image', imagen.buffer, {
        filename: imagen.originalname ,       
        contentType: imagen.mimetype           
      })
        
      const response = await axios.post('https://convertidor-webp-service.onrender.com/upload', form, {
        headers: form.getHeaders(),
        timeout: 30000 // 10 segundos de timeout
      })
      
      
      if (response.status === 200 && response.data && response.data.url) {
        return response.data;
      }
      return response
    } catch (externalError) {   
      console.log(externalError.message)
    }


  } catch (err) {
    console.error('❌ converterController - Error al procesar imagen:', err.message);
    throw new Error("Error al procesar la imagen");
  }
}
