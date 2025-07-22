import axios from "axios"
import data from "../const/const.js"
export class emailController {
    static async registroEmail (email,nombre) {
     try {
        let emailReponse = await axios.post(`${data.emailUrl}/registro`,{mail:email,nombre})
        if(emailReponse.status == 200){
            return 'Mail de registro enviado!'
        }
     } catch (err) {
        return err.message
     }
    }
    static async crearEvento (event_name,event_id,codigo,mail) {
        try{
     const mailResponse = await axios.post(`${data.emailUrl}/codigo`,{event_name,event_id,codigo,mail})
     if(mailResponse.status == 200) {
        return 'Codigo enviado!'
     }
    } catch (err) {
        return err.message
    }
    }
    static async InscripcionEvento (destino,event_id,event_name,event_descripcion,event_img) {
        try {
         let emailReponse = await axios.post(`${data.emailUrl}/inscripcion`,{destino,event_id,event_name,event_descripcion,event_img})
        if(emailReponse.status == 200){
            return 'Mail de inscripcion enviado!'
        }
        } catch (err) {
            return err.message
        }
    }
    static async archivoCreado (destino,nombre) {
         try {
         let emailReponse = await axios.post(`${data.emailUrl}/archivo`,{destino,nombre})
        if(emailReponse.status == 200){
            return 'Mail de archivo enviado!'
        }
        } catch (err) {
            return err.message
        }
    }
}