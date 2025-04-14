import dbLocal from 'db-local'

const { Schema } = new dbLocal({ path: 'src/db ' })

export const Eventos = Schema('Eventos', {
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  lugar: { type: String, required: true }
})

// const createevent = () => {
//   Eventos.create({
//     id: 10,
//     nombre: 'Foro de Criptoeconomía',
//     descripcion: 'Charlas y networking sobre blockchain y criptomonedas',
//     fecha: 'Abril 28, 2025',
//     hora: '13:00PM - 19:00 PM',
//     lugar: 'NH Hotel, Buenos Aires'
//   }).save()
// }

// createevent()
