import Event from "../schema/eventSchema.js";

export class DisertanteController {
    static async verifyCode (req,res) {
      const {code,id} = req.body;
      console.log(code,id)
      const evento = await DisertanteController.getEventoId(id)
      if(evento.length) {
       console.log(evento)
      }
      res.send('hi')
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