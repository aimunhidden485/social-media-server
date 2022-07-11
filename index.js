import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRoute from './Routes/UserRoute.js'
import AuthRoute from './Routes/AuthRoute.js'
import cors from 'cors'
import uploadRoute from './Routes/UploadRoute.js'
import PostRoute from './Routes/PostRoute.js'

const app=express()

app.use(express.static('public'))
app.use('/images', express.static('images'))


// routes
 
// middleware
app.use(bodyParser.json({limit:'30mb', extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}))
 app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser:true, useUnifiedTopology: true
}).then(()=>app.listen(process.env.PORT , ()=> console.log('listening'))).catch((error)=>console.log(error))

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', uploadRoute)