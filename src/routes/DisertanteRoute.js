import express from 'express'
import { DisertanteController } from '../controller/DisertanteController.js'
const DisertanteRoute = express.Router()


DisertanteRoute.post('/verifyCode',DisertanteController.verifyCode)
DisertanteRoute.get('/listaDeDisertante/:IdEvento',DisertanteController.ListaDeDisertantes)
DisertanteRoute.post('/crearDisertante', DisertanteController.crearDisertante)


export default DisertanteRoute