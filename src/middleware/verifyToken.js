const secret_Key = "jsonwebtokensecretkey"
const jwt = require('jsonwebtoken')

const verifyToken = async (req,res,next) => {
        let token = req.headers['authorization']
        if(token){
            jwt.verify(token,secret_Key,(err,valid)=>{
                if(err){
                    throw new Error('please enter a valid token')
                }
                next()
            })
        }else{
            res.send({result : 'please provide a token'})
        }
}

module.exports = verifyToken