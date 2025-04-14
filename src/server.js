import express from 'express'
import router from './router/router.js'
import data from './const/const.js'
import cookieParser from 'cookie-parser'
import { mongooseconection } from './conection/mongoconection.js'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
mongooseconection()
app.use('/', router)

app.listen((data.port), () => { console.log('server is running') })
