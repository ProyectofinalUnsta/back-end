import Event from "../schema/eventSchema.js";
import Disertante from "../schema/DisertanteSchema.js";
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
  static async ListaDeDisertantes (req,res) {
     const {IdEvento} = req.params

     if(!IdEvento)  res.status(400).send('Parametro no enviado!')
    
      try {
       const disertantes = await Disertante.find({IdEvento:IdEvento})
       if(!disertantes.length) return res.status(200).send({message:'no hay disertantes Inscriptos!',total:0})
       const lista = disertantes.filter(campo => campo.fullName && campo.gmail)
      .map(campo =>({
      fullName:campo.fullName,
      gmail:campo.gmail}))
       res.status(200).send({message:'lista de disertantes',total:disertantes.length,lista:lista})
       return
      } catch (err) {
         res.status(500).send({message:err.message})
      }

  }

  static async crearDisertante (req,res) {
   const {gmail , IdEvento , fullName} = req.body 
     if(!gmail || !IdEvento || !fullName) res.status(400).send('Todos los campos son requeridos')

      try {
       const disertante = new Disertante({
         fullName:fullName,
         gmail:gmail,
         IdEvento:IdEvento
       })

       await disertante.save()

       res.status(201).send('Disertante Creado con exito')

      } catch (err) {
         res.status(500).send({message:err.message})
      }
  }
}