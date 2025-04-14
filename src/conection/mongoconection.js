import mongoose from 'mongoose'
import data from '../const/const.js'

export const mongooseconection = async () => {
  await mongoose.connect(data.db).then(() => console.log('Conectado a mongo con exito!'))
}
