import axios from "axios"
import FormData from "form-data"
export const converterController = async (imagen) => {
  try {
    const form = new FormData()


    form.append('image', imagen.buffer, {
      filename: imagen.originalname || 'archivo.webp',       
      contentType: imagen.mimetype || 'image/webp'           
    })
      
    const response = await axios.post('https://convertidor-webp-service.onrender.com/upload', form, {
      headers: form.getHeaders()
    })
    console.log(response)
    return response.data

  } catch (err) {
    console.log('Error al enviar:', err.message)
  }
}
