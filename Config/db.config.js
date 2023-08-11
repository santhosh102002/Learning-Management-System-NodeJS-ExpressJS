const mongoose = require("mongoose");

mongoose.set('strictQuery',false) // Dont throw error if any field not found in DB

const dbconnect = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log(`Connected successfully to MongoDB ${conn.connection.host}`);
    })
    .catch((err)=>{
        console.log(`Failed to connect to MongoDB`)
    })
}

module.exports = dbconnect