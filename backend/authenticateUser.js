const jwt=require('jsonwebtoken')
require('dotenv').config()



module.exports=authenticateToken=(req,res,next)=>{
try{
    // const req.cookie
    const token=req.cookies.accessToken

if(!token){
return res.status(401).json({msg:'unauthorized'})
}
const user= jwt.verify(token, process.env.TOKEN_SECRET_KEY)

if(!user){
    return res.status(401).json({msg:'unauthorized'})
}
req.user=user
next()


}catch(err){
    res.status(400).json({
        msg:err
    })
        
}

}