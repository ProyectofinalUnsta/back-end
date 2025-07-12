import mongoose from "mongoose"
import Inscriptos from "../schema/InscriptoSchema.js"
import Presentation from "../schema/PresentationSchema.js"
// Eliminada importación de recuentosInscriptos

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
        
       const MappedIdEventosInscripto = IdEventosInscriptos.map(inscripto => new mongoose.Types.ObjectId(inscripto.idEvento))
           console.log( 'set de IDS', IdEventosInscriptos)
        const Archivos = await Presentation.find({event:{ $in: MappedIdEventosInscripto}})
   
         res.status(200).json(Archivos)
        } catch (err) {
            res.status(401).send(err.message)
        }
     
    }
    static async getInscripcionPorEvento (req,res) {
        const { gmail,idEvento } = req.query

        if(!gmail || !idEvento) {
          return res.status(400).send('Campos faltantes')
        } 
            try {
                const inscripto = await Inscriptos.findOne({gmail:gmail, idEvento: new mongoose.Types.ObjectId(idEvento)})
                  if (!inscripto) {
                   return res.status(200).json({ inscrito: false, mensaje: 'No está inscripto' });
                   }
                 
                   return res.status(200).json({ inscrito: true, inscripto });
            
            } catch (err) {
               res.status(401).send(err.message)
            }
    }
    static async desinscribirmeEvento(req, res) {
        const { gmail, idEvento } = req.body;
        if (!gmail || !idEvento) {
            return res.status(400).send('Campos faltantes');
        }
        try {
            const result = await Inscriptos.findOneAndDelete({ gmail: gmail, idEvento: new mongoose.Types.ObjectId(idEvento) });
            if (!result) {
                return res.status(404).json({ message: 'No se encontró inscripción para eliminar' });
            }
            return res.status(200).json({ message: 'Baja exitosa' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    static async getRecuentosEventosPorAdmin(req, res) {
        const { adminId, adminEmail } = req.query;
        if (!adminId && !adminEmail) return res.status(400).send('Falta adminId o adminEmail');
        try {
            // Buscar eventos creados por el admin (por email)
            const eventos = await mongoose.model('Event').find({ creadoPor: adminEmail });
            const eventoIds = eventos.map(ev => new mongoose.Types.ObjectId(ev._id));
            // Agrupar inscriptos por evento y contar gmails únicos
            const recuentos = await mongoose.connection.db.collection('inscriptos').aggregate([
                { $match: { idEvento: { $in: eventoIds } } },
                { $group: { _id: "$idEvento", gmails: { $addToSet: "$gmail" } } },
                { $project: { _id: 1, cantidadInscriptos: { $size: "$gmails" } } }
            ]).toArray();
            // Unir info
            const resultado = eventos.map(ev => {
                const rec = recuentos.find(r => String(r._id) === String(ev._id));
                return {
                    _id: ev._id,
                    nombreEvento: ev.title,
                    cantidadInscriptos: rec ? rec.cantidadInscriptos : 0
                }
            });
            console.log('Métricas generadas:', resultado);
            res.status(200).json(resultado);
        } catch (err) {
            console.error('Error en métricas:', err);
            res.status(500).send(err.message);
        }
    }
    static async getEventosInscriptoPorGmail(req, res) {
        const { gmail } = req.params;
        if (!gmail) return res.status(400).json({ error: 'Gmail es requerido' });
        try {
            // Buscar inscripciones por gmail
            const inscripciones = await Inscriptos.find({ gmail });
            if (!inscripciones.length) return res.status(200).json([]);
            // Obtener los IDs de los eventos y asegurarse que sean ObjectId
            const eventosIds = inscripciones.map(i => {
                try {
                    return new mongoose.Types.ObjectId(i.idEvento);
                } catch {
                    return i.idEvento;
                }
            });
            // Buscar los eventos completos
            const eventos = await mongoose.model('Event').find({ _id: { $in: eventosIds } });
            res.status(200).json(eventos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}