const JWT_SECRET = "SECRETSTRING";
const jwt = require("jsonwebtoken");
fetchuser = (req,res,next)=>{
    authToken = req.header("auth-token");
    if(!authToken){
        res.status(401).send("Please authenticate with a valid token")    
    }
    try{
        const data = jwt.verify(authToken,JWT_SECRET)
        if(!data){
            res.status(401).send("Please authenticate with a valid token")
        }
        req.user = data.user
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).send("Please authenticate with a valid token")
    }
}
module.exports = fetchuser