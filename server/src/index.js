import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import { connectDB } from './utils/db.js';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express()

dotenv.config()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.use('/api/auth',authRoute)



app.listen(PORT,()=>{
   console.log(`app is listining on ${PORT}`)
   connectDB()
})