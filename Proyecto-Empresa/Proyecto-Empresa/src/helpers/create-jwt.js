const jwl = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET_KEY

const generateJWT = async(eid, name,email,)=>{
    const payload = {eid,name,email}
    try{
        const token = await jwl.sign(payload, secret, {
            expiresIn: "1h"
        })
        return token
    }catch(error){
        throw new Error(error + 'No se ha podido generar el token')
    }   
}

module.exports= {generateJWT}