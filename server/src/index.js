import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connectDB } from './utils/db.js';

import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import cloudinary from 'cloudinary'

import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'

const app = express()

dotenv.config()


const PORT = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use('/api/auth',authRoute)
app.use('/api/auth',messageRoute)

app.listen(PORT,()=>{
   console.log(`app is listining on ${PORT}`)
   connectDB()
})