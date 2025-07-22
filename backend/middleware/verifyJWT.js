const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req,res,next) => {
    const authHead = req.headers['authorization']
    // console.log(req.headers)
    if(!authHead) return res.sendStatus(401)
    const token = authHead.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err,decoded) => {
            if(err) return res.sendStatus(403)
            req.user = decoded.username
            console.log(decoded)
            next()
        }
    )
}

module.exports = {verifyJWT}