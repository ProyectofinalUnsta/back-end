import Event from "../schema/eventSchema.js";

export class DisertanteController {
    static async verifyCode (req,res) {
      const {code,id} = req.body;

       if(!code || !id) return res.status(400).send({ message: 'Faltan datos requeridos (code o id)', value: false });
       try {
      const evento = await DisertanteController.getEventoId(id)
       if(!evento.length) return;

      const {codigoDisertante} = evento[0]


      if(codigoDisertante == code) return res.status(200).send({message:'Codigo Correcto', value:true})
      else return res.status(200).send({message:'Codigo Incorrecto', value:false})
       } catch (err) {
        return res.status(500).send(err.message)
       }
    }
  static async getEventoId (id) {
     try {
        const response = await Event.find({_id:id})
       return response.length ? response : false
     } catch (err) {
        return err.message
     }
  }
}