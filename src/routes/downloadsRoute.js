import express from 'express'
import { DownloadController } from '../controller/DownloadController.js'

const DownloadRoute = express.Router()


DownloadRoute.get('/TotalDownloads/:id',DownloadController.getTotslDownloads)


export default DownloadRoute