import Eventos from '../schema/EventosSchema.js'

export class Eventocontroller {
  static async getEventos () {
    try {
      const result = await Eventos.find({})
      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

  static async postEventos (datos) {
    const { nombre, descripcion, fecha, lugar, hora } = datos
    try {
      const evento = new Eventos({nombre:nombre, descripcion:descripcion, fecha:fecha, lugar:lugar, hora:hora })
      await evento.save()
    } catch (err) {
      throw new Error(err.message)
    }
  }

  static async getEventosByName (nombre) {
   try {
    const result = await Eventos.find({nombre:nombre})
    return result
   } catch (err) {
    throw new Error(err.message)
   }
  }
}
