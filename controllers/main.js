const jwt=require("jsonwebtoken");
const { BadRequestError } = require("../errors");
const CustomAPIError = require("../errors/custom-error");


const login= async (req,res)=>{
    const {username,password}=req.body;
    // console.log(username,password);
    if(!username||!password){
        throw new BadRequestError("Please provide username and password",400)
    }
    const id= new Date().getDate();

   const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:'user created',token:token})
}

const dashboard=async (req,res)=>{
  console.log(req.user);
    const luckyNumber= Math.floor(Math.random()*100);
    res.status(200).json({msg:`hello ${req.user.username}`,secret:`your number is ${luckyNumber}` })
}


module.exports={dashboard,login};