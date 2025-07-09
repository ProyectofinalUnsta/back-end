import express from 'express'
import { DisertanteController } from '../controller/DisertanteController.js'
const DisertanteRoute = express.Router()


DisertanteRoute.post('/verifyCode',DisertanteController.verifyCode)

export default DisertanteRoute