const express = require('express');
const app = express();
require('dotenv').config()
const dbconnect = require('./Config/db.config')
const cookieParse = require('cookie-parser')
const userRouter = require('./models/user.models')
const middlewareError  = require('./middlewares/error.middleware')


app.use(express.json());

dbconnect()

// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     credentials:true
// }))
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