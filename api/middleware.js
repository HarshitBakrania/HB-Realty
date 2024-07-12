import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) =>{
    const authToken = req.cookies.authToken;

    if(!authToken){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        req.userId = decoded.id;

        next();
    }catch(error){
        console.log(error)
        res.status(403).json({
            message: "Error while verifying token"
        })
    }
}
