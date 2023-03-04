'use strict'
require('dotenv').config()
const database = process.env.DATABASE
const mongoose = require("mongoose")
mongoose.set("strictQuery", true)


const connection = async()=>{
    try{
        await mongoose.connect(database)
        console.log("Se ha establecido la conexion a la base de Datos")
    }catch(error){
        console.log(error)
        throw new Error("Hubo un problerma en la conexion")

    }
}

module.exports = { connection }