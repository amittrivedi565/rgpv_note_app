const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.config")

const authVerify = (req,res,next)=>{
try{
    let token = req.cookies['api-auth'];
    if(token)
    {
        req.user = jwt.verify(token,authConfig.JWT_SECRET_KEY);
        console.log(req.user);
    }
    else{
        res.redirect('/close/login');
    }
    next();
}
catch(error){
    console.log(error);
    res.status(401).json({message : "Unauthorized"});
    }
};

module.exports = authVerify;