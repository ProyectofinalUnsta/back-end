import express from 'express'
import { Eventocontroller } from '../controller/eventocontroller.js'
const AdminRoute = express.Router()

AdminRoute.use((req, res, next) => {
  const token = req.session.user
  if (token == null) {
    res.setHeader('Access-Controll-Allow-Origin', '*')

    res.setHeader('Access-Controll-Allow-Methods', 'GET ')

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    res.setHeader('Access-Control-Allow-Credentials', true)
  } else {
    res.setHeader('Access-Controll-Allow-Origin', '*')

    res.setHeader('Access-Controll-Allow-Methods', 'GET ')

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    res.setHeader('Access-Control-Allow-Credentials', true)
  }

  next()
})

AdminRoute.get('/', async (req, res) => {
  const data = await Eventocontroller.getEventos()
  res.send(data)
})

AdminRoute.post('/', async (req, res) => {
  const entrydata = req.body
  await Eventocontroller.postEventos(entrydata)
  res.send({ mensaje: 'Creacion de evento exitoso!' })
})

export default AdminRoute
