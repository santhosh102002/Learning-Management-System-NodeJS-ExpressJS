const express = require('express');
const app = express();
require('dotenv').config()
const dbconnect = require('./Config/db.config')
const cookieParse = require('cookie-parser')


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

app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 page not found')

    })







module.exports = app