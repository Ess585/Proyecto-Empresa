'use strict'
const express = require('express')
const {Router} = require('express')
const {createEnterprise, addSucursal, listEnterprises, updateEnterprise, deleteEnterprise, login, deleteSucursal, updateSucursal} = require("../controller/enterprise.controller")
const { validateJWT } = require('../middlewares/validateJWT')
const api = Router()

api.post('/create-enterprise', createEnterprise);
api.post('/add-sucursal/:id', validateJWT ,addSucursal);
api.get('/list-enterprises', listEnterprises);
api.put('/update-enterprise/:id', updateEnterprise);
api.put('/update-sucursal/:id',updateSucursal);
api.delete('/delete-enterprise/:id', deleteEnterprise);
api.delete('/delete-sucursal/:id',deleteSucursal);
api.post('/login',login)

module.exports = api;