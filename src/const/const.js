import dotenv from 'dotenv'
dotenv.config()

const data = {}

if (process.env.NODE_ENV === 'production') {
  data.port = process.env.APP_PORT
  data.secret = process.env.APP_SECRET_KEY
  data.db = process.env.APP_DB_URL
}

export default data
