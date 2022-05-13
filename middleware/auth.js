
const jwt=require("jsonwebtoken");
const { Unauthorized } = require("../errors");


const authMiddleware=(req,res,next)=>{
    console.log("authMiddleware")
    const auth=req.headers.authorization;
    // console.log(auth)
    if(!auth||!auth.startsWith('Bearer ')){
        throw new Unauthorized('Please provide the token')
    }
    const token =auth.split(' ')[1];

    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded);
       const {username,id}=decoded;
     req.user={username,id}
        next();
   
    } catch (error) {
        throw new Unauthorized('not authorized to access this route')
    }

}

module.exports=authMiddleware;