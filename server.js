
const app = require('./app')

PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`The server started at ${PORT}`)
});