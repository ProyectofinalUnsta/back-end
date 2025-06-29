import express from 'express'
import { InscriptosController } from '../controller/InscriptosController.js'

const InscriptosRoute = express.Router()

InscriptosRoute.post('/', InscriptosController.InscribirmeEvento)
InscriptosRoute.get('/inscripto',InscriptosController.getInscripcionPorEvento)
InscriptosRoute.get('/inscriptos/:gmail',InscriptosController.getArchivosInscripto)



export default InscriptosRoute