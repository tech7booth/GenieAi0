const {
    asyncHandler
} = require("../utils/api.utils");
const {
    verifyToken
} = require("../utils/jwt.utils");

const decodeToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt || req.headers['Authorization'] // Bearer <token>

    if(!token){
        return res.status(404).json({
            status:false,
            authorised:false,
            message:"token not found !"
        })
    }
    const decoded = verifyToken(token);
    if (!decoded.status || !decoded.data) {
        return res.status(401).json({
            status:false,
            authorised:false,
            message: "Unauthorized access"
        })
    }

    req.data = decoded.data;
    return next();
});

module.exports = {decodeToken};

