import mongoose from 'mongoose'

const EventosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  descripcion: {
    type: String,
    required: true,
    min: 30,
    max: 80
  },
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  lugar: {
    type: String,
    required: true
  }
})

const Eventos = mongoose.model('eventos', EventosSchema)

export default Eventos
