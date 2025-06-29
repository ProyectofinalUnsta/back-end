import express from 'express'
import { InscriptosController } from '../controller/InscriptosController.js'

const InscriptosRoute = express.Router()

InscriptosRoute.post('/', InscriptosController.InscribirmeEvento)
InscriptosRoute.get('/inscripto',InscriptosController.getInscripcionPorEvento)
InscriptosRoute.get('/:gmail',InscriptosController.getArchivosInscripto)



export default InscriptosRoute