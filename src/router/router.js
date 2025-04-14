import express from 'express'
import userRoute from '../routes/userRoute.js'
import AdminRoute from '../routes/adminRoute.js'
import jwt from 'jsonwebtoken'
import data from '../const/const.js'
const router = express.Router()

router.use((req, res, next) => {
  const token = req.cookies.access_token
  let datos = null
  req.session = { user: null }
  try {
    datos = jwt.verify(token, data.secret)
    req.session.user = datos
  } catch (err) {
    req.session.user = null
  }
  next()
})

router.use('/', userRoute)
router.use('/admin', AdminRoute)

export default router
