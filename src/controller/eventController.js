import Event from "../schema/eventSchema.js";
import { converterController } from "../controller/converterController.js";
import { emailController } from "./emailController.js";
import { GeneradorCodigo } from "../utils/generadorCodigo.js";
import { emailController } from "./emailController.js";
export class eventController {
  static async getEventos(req, res) {
    try {
      const eventos = await Event.find();
     return eventos
    } catch (error) {
      return error
    }
  }

  static async postEventos (req, res) {
  try {
    const { title, descripcion, breveDescripcion, fecha, hora, categoria, lugar , email } = req.body;

    if (!title || !descripcion || !breveDescripcion || !fecha || !hora || !categoria || !lugar || !email || !req.file) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const uploadResult = await converterController(req.file);
    const imagen = uploadResult.url;
    const codigoDisertante = GeneradorCodigo.codigoDisertante()
    const event = new Event({
      title,
      descripcion,
      breveDescripcion,
      fecha,
      hora,
      categoria,
      lugar,
      imagen,
      creadoPor:email,
      codigoDisertante:codigoDisertante
    });
    await event.save();
    const event_name = event.title
    const event_id = event._id
    const codigo = codigoDisertante
    const mail = event.creadoPor
    await emailController.crearEvento(event_name,event_id,codigo,mail)
    return res.status(200).json({ message: 'Evento creado de manera exitosa!' });

  } catch (error) {
    console.error("Error al crear evento:", error);
    return res.status(500).json({ error: 'Error del servidor: ' + error.message });
  }
}


  static async getEventoById(req, res) {
  try {
      const evento = await Event.find({creadoPor:req.params.email});
      if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }
      res.status(200).json(evento);
    } catch (error) {
      res.status(400).json({ error: error.message });
}
  }

  static async updateEvento(req, res) {
    try {
      const { title, descripcion, lugar, fecha, breveDescripcion, hora, categoria, imagen } = req.body;
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        { title, descripcion, fecha, lugar, breveDescripcion, hora, categoria, imagen , codigoDisertante },
        { new: true },
      );

      if (!updatedEvent) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      res.status(200).json({ message: "Evento actualizado exitosamente", event: updatedEvent });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteEvento(req, res) {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);

      if (!deletedEvent) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      res.status(200).json({ message: "Evento eliminado exitosamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteEvent(req, res) {
    try {
      const eventId = req.params.id;
      const deleted = await Event.findByIdAndDelete(eventId);
      if (!deleted) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      res.status(200).json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar evento:', error); // Log detallado
      res.status(500).json({ error: error.message });
    }
  }
}