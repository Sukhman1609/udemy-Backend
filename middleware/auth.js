
const jwt=require("jsonwebtoken")
const secret_key ='hello16';

const auth=(req,res,next)=>{
    const BearerToken=req.headers["authorization"]
   
    if(BearerToken){
        const token=BearerToken.split(" ")[1];

        const validate=jwt.verify(token,secret_key);
        if(validate){
            next();
        }
        return res.send({msg:"User is not Authorized"})
    }
    return res.send({msg:"User is not Allowed...Please try again"})
}
module.exports=auth;