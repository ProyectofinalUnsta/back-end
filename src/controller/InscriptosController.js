import mongoose from "mongoose"
import Inscriptos from "../schema/InscriptoSchema.js"
import Presentation from "../schema/PresentationSchema.js"

export class InscriptosController {
    static async InscribirmeEvento (req,res)  {
       const {gmail,nombre,apellido, nombreEvento,idEvento } = req.body

       if(!gmail || !nombre || !apellido || !nombreEvento|| !idEvento) return res.status(400).send('Error: Campos faltantes')

        try {
            const inscripto =  new Inscriptos({
                idEvento:idEvento,
                nombreEvento:nombreEvento,
                gmail:gmail,
                nombre:nombre,
                apellido:apellido
            })
            const savedInscripto = await inscripto.save()

        res.status(201).send({message:'Inscripto con exito!',id:savedInscripto._id})

        } catch (err) {
            res.status(401).send(err.message)
        }
    }
    static async getArchivosInscripto (req,res) {
        if(!req.params.gmail) return res.status(401).send('Error gmail es igual a Vacio')

        try {
          const IdEventosInscriptos = await Inscriptos.find({gmail:req.params.gmail})
       const MappedIdEventosInscripto = IdEventosInscriptos.map(inscripto => new  mongoose.Types.ObjectId(inscripto.idEvento))
        const Archivos = await Presentation.find({event:{ $in: MappedIdEventosInscripto}})
         res.status(200).json(Archivos)
        } catch (err) {
            res.status(401).send(err.message)
        }
     
    }
    static async getInscripcionPorEvento (req,res) {
        const {gmail,idEvento} = req.body
        if(!gmail || !idEvento) return res.status(400).send('Campos faltantes')

            try {
                const inscripto = await Inscriptos.findOne({gmail:gmail, idEvento: mongoose.Types.ObjectId(idEvento)})
                  if (!inscripto) {
                   return res.status(404).json({ inscrito: false, mensaje: 'No está inscripto' });
                   }
                
                   return res.status(200).json({ inscrito: true, inscripto });
            
            } catch (err) {
               res.status(401).send(err.message)
            }
    }
}