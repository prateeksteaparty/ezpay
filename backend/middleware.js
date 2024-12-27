const { JWT_SECRET} = require("./config")
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // a authorization header is created

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({}); //checks if token starts with 'Bearer '
    }

    const token = authHeader.split(' ')[1]; // splits token such that bearer is gone and remaining token is got

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        //token is verified here
        if(decoded.userId){
            req.userId = decoded.userId;  //token is decoded corresponding to the user
            next();
        }else{
            return res.status(403).json({});
        }

    } catch (err){
        return res.status(403).json({}); // just in case a error happens we catch it instead of crashing postman
    }
}

module.exports = {
    authMiddleware
}