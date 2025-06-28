import express from 'express'
import { InscriptosController } from '../controller/InscriptosController.js'

const InscriptosRoute = express.Router()

InscriptosRoute.post('/', InscriptosController.InscribirmeEvento)
InscriptosRoute.get('/:gmail',InscriptosController.getArchivosInscripto)
InscriptosRoute.get('/inscripto',InscriptosController.getInscripcionPorEvento)


export default InscriptosRoute