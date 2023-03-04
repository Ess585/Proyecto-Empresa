'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmpresaSchema = Schema({
    nombreEmpresa: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tipoEnterprise: {
        type: String,
        require: true
    },
    sucursales: [{
        direccion: String,
        nSucursal: Number,
    }]
})

module.exports = mongoose.model("empresas", EmpresaSchema)