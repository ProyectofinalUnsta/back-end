import axios from "axios"

export class emailController {
    static async registroEmail (email) {
     try {
        let emailReponse = await axios.post('https://email-sender-qs8y.onrender.com/registro',{mail:email})
        if(emailReponse.status == 200){
            return 'Mail de registro enviado!'
        }
     } catch (err) {
        return err.message
     }
    }
    static async crearEvento (codigo,mail) {
        let id = codigo
        try{
     const mailResponse = await axios.post('https://email-sender-qs8y.onrender.com/codigo',{codigo:id,mail})
     if(mailResponse.status == 200) {
        return 'Codigo enviado!'
     }
    } catch (err) {
        return err.message
    }
    }
}