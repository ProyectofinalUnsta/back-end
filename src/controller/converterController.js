import axios from "axios"
import FormData from "form-data"

export const converterController = async (imagen) => {

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

      console.log(response)
      
      
      if (response.status === 200 && response.data && response.data.url) {
        return response.data;
      }
      
    } catch (err) {
      throw new Error(err.message)
    }

}
