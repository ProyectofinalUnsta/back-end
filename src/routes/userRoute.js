import express from 'express'
import { Eventocontroller } from '../controller/eventocontroller.js'
const userRoute = express.Router()

userRoute.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.setHeader('Access-Control-Allow-Methods', 'GET')

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
})

userRoute.get('/', async (req, res) => {
  const data = await Eventocontroller.getEventos()
  res.send(data)
})

export default userRoute
