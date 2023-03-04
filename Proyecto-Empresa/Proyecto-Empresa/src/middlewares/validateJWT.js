const{request, response} = require("express")
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Enterprise = require("../models/enterprise.model");

const validateJWT = async (req = request, res = response, next)=>{
    const token = req.header("token-28");

    if(!token){
        return res.status(401).send({
            message: "No existe ningun token"
        })
    }


try {
    const payload = jwt.decode(token, process.env.KEY);
    const nameEnterprise = await Enterprise.findById(payload.eid);
    console.log(nameEnterprise);
    if(payload.exp <= moment().unix()){
        return res.status(500).send({message: "La sesion ha expirado"});
    }

    if(!nameEnterprise){
        return res.status(401).send({
            message:"El token no es valido"
        });
    }
    req.enterprise = nameEnterprise
    next();
} catch (error) {
    throw new Error(error)
    }
}
module.exports = { validateJWT }