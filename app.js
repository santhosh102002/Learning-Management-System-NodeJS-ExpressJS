const express = require('express');
const app = express();
require('dotenv').config()
const dbconnect = require('./Config/db.config')
const cookieParse = require('cookie-parser')
const userRouter = require('./routes/user.router')
const middlewareError  = require('./middlewares/error.middleware')
const connectCloudinary = require('./Config/cloudinary.config')
const morgan = require('morgan')


app.use(express.json());

dbconnect()
connectCloudinary.cloudinaryConnect()

// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     credentials:true
// }))
app.use(morgan('dev'))
app.use(cookieParse())
app.use('/ping',(req,res)=>{
    res.send('Pong')
})
app.use('/api/v1/user',userRouter)

app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 page not found')

})

app.use(middlewareError)







module.exports = app