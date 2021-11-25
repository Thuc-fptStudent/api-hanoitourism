const jwt= require('jsonwebtoken');

function checkAccessToken (req,res,next){
    try{
    const token= req.headers.authorization.split(" ")[1];
     const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
     req.user= decodedToken;
     next();
}catch(error){
    return res.status(401).json({
        message: "Invalid or expired token provided!",
        })
    }

};

function checkRefreshToken (req,res,next){
    try{
    const token= req.headers.authorization.split(" ")[1];
     const decodedToken= jwt.verify(token, process.env.REFRESH_TOKEN_SECRET );
     req.user= decodedToken;
     next();
}catch(error){
    return res.status(401).json({
        message: "Invalid or expired token provided!",
        error: err.message
        })
    }

};
module.exports={
    checkAccessToken: checkAccessToken,
    checkRefreshToken: checkRefreshToken
}