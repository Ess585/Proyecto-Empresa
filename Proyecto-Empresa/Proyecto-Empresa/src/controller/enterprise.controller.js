'use strict'
const Enterprise = require("../models/enterprise.model")
const bcrypt = require('bcrypt')
const {generateJWT} = require('../helpers/create-jwt')


//CRUD PARA LLEVAR UN CONTROL DE EMPRESAS
//AGREGAR EMPRESA
const createEnterprise = async(req,res)=>{
    const {nameEnterprise, email, password, tipoEnterprise} = req.body
    try{
        let empresa = await Enterprise.findOne({email})
        if(empresa){
            return res.status(400).send({
                ok: false,
                message: 'Este correo ya se encuentra en uso',
                empresa: empresa
            })
        }
        empresa = new Enterprise(req.body)
        const salt = bcrypt.genSaltSync()
        empresa.password = bcrypt.hashSync(password, salt)
        empresa = await empresa.save()
        const token = await generateJWT(empresa.id, empresa.direccion, empresa.nSucursal)
        res.status(200).send({
            message:`Bienvenido a la empresa! ${nameEnterprise}`,
            empresa, 
            token
        })

    }catch(error){
        throw new Error(error)
    }
}

//LISTAR EMPRESAS
const listEnterprises = async(req,res)=>{
  try{
    const enterprises = await Enterprise.find()
    if(!enterprises){
      res.satatus(400).send({
        message: 'No hay datos'
      })
    }else{
      res.status(200).send({
        Empresas: enterprises
      })
    }
  }catch(error){
    throw new Error(error)
  }
}

//ACTUALIZAR EMPRESA
const updateEnterprise = async (req,res)=>{
  const id = req.params.id
  const editEnterprise = {...req.body}
  editEnterprise.password = editEnterprise.password
  ? bcrypt.hashSync(editEnterprise.password, bcrypt.genSaltSync())
  : editEnterprise.password
  const enterP = await Enterprise.findByIdAndUpdate(id, editEnterprise,{new:true})
  if(enterP){
    res.status(200).send({
      message: 'El registro ha sido actualizado', enterP
    })
  }else{
    res.status(400).send({message: 'El registro que buscas no existe'})
  }
  
  
}

//ELIMINAR EMPRESA
const deleteEnterprise = async (req,res)=>{
  try{
    const id = req.params.id
    const elimEnterprise = await Enterprise.findByIdAndDelete(id)
    return res.status(200).send({
      message: 'Se han eliminado los datos'
    })
  }catch(error){
    throw new Error(error)
  }
}

//INICIAR SESION
const login = async(req,res)=>{
  const { email, password } = req.body
  try{
    const enterPrise = await Enterprise.findOne({email})
    if(!enterPrise){
      return res.status(400).send({
        ok:false,
        message: "Los datos que mandaste no coinciden con los que se han registrado"
      })
    }
    const validPassword = bcrypt.compareSync(password, enterPrise.password)
    if(!validPassword){
      return res.status(400).send({
        ok: false,
        message: "Incorrect Password"
      })
    }
        res.json({
            ok: true,
            eid: empresa.id,
            name: empresa.name,
            email: empresa.email,
            empresa: empresa.nombreEmpresa,
            puesto: empresa.puesto,
            
        })
  }catch(er){
    throw new Error(er)
  }
}

//AGREGAR SUCURSAL
const addSucursal = async (req, res) => {
  //if (req.token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaWQiOiI2NDAyNzdlYWUwMzdkYTU4NTFmMTI2MWQiLCJpYXQiOjE2Nzc4ODMzNzAsImV4cCI6MTY3Nzg4Njk3MH0.jKRo-rkq2sIYBMe-U-cR2XUX4UsZxNMcMVPlbAvHGwk") {
    const { name, email} = req.body; 
  try {
    const id = req.params.id;
    const { direccion, nSucursal } = req.body;

    const registSucursal = await Enterprise.findByIdAndUpdate(id,
      {
        $push: {
          sucursales: {
            direccion: direccion,
            nSucursal: nSucursal,
           
          },
        },
      },
      { new: true }
    );
    if (!registSucursal) {
      return res.status(404).send({ message: "No hemos encontrado este registro" });
    }

    return res.status(200).send({ message: "Se ha registrado una nueva sucursal", registSucursal });
  } catch (error) {
    throw new Error(error);
  }
  /*} else {
      return res.status(400).send({message: "Este token no existe"});
  } */
};

//ELIMINAR SUCURSAL
const deleteSucursal = async(req,res)=>{
  const id = req.params.id;
    const { idSucursal } = req.body;
    try {
      const elimSucursal = await Enterprise.updateOne(
        { id },
        {
          $pull: { sucursales: { _id: idSucursal } },
        },
        { new: true, multi: false }
      );
  
      if (!elimSucursal) {
        return res.status(404).send({ message: "El registro no existe" });
      }
  
      return res.status(200).send({ message: `sucursal eliminado`, elimSucursal });
    } catch (error) {
      throw new Error(error);
    }
}

//ACTUALIZAR SUCURSAL
const updateSucursal = async(req,res)=>{
  const id = req.params.id;
    const {idSucursal, direccion, nsucursal} = req.body;
    try {
      const editSucursal = await Enterprise.updateOne(
        { _id: id, "sucursal._id": idSucursal },
        {
          $set: {
            "sucursal.$.direccion": direccion,
            "sucursal.$.nsucursal": nsucursal
          },
        },
        { new: true }
      );
  
      if (!editSucursal) {
        return res.status(404).send({ message: "No existe este registro" });
      }
  
      return res.status(200).send({ message: "se edito la sucursal con exito", editSucursal });
    } catch (error) {
      throw new Error(error);
    }
}


module.exports = {createEnterprise, listEnterprises, addSucursal, updateEnterprise, deleteEnterprise, login, deleteSucursal, updateSucursal}