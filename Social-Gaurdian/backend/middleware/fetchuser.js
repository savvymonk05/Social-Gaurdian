const jwt=require("jsonwebtoken");
const JWT_SECRET="anandisagoodb$oy";

const fetchuser=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        return res.status(401).send("please authenticate using a valid token")
    }
    try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
    }catch(error){
        console.error(error.message);
        res.status(401).send("please authenticate using a valid token")
    }

}

module.exports=fetchuser;