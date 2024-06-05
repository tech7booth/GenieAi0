const {
    asyncHandler,
    ApiError,
    ApiResponse
} = require("../utils/api.utils");
const {generateToken} = require("../utils/jwt.utils")
const User = require("../modals/user.modal");


const login = asyncHandler(async (req, res) => {
    const {
        phone,
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    });

    if (!user) {
        return res.status(400).json(new ApiResponse(400, "User with this phone no. or email doesn't exists !"))
    }

    const isPassRight = await user.checkPassword(password);
    if (!isPassRight) {
        return res.status(400).json(new ApiError(400, "Wrong password ! try again."))
    }

    const {
        token,
        expiresAt
    } = generateToken({
        userId: user._id,
        role: user.role
    });

    res.cookie('jwt', token, {
        sameSite: 'none',
        secure: true
    });
    res.cookie("jwtExpiresAt", expiresAt, {
        sameSite: 'none',
        secure: true
    });

    delete user.toObject().password;
    return res.json(new ApiResponse(200, "Logged in to your account successfully !", {
        token,
        expiresAt,
        user
    }))
})

const signup = asyncHandler(async (req, res) => {
    const {
        phone,
        email = null,
        name,
        password
    } = req.body;

    if ((!phone && !email) || !password) {
        return res.status(400).json(new ApiError(400, "Missing parameters !"))
    }
    if (!password) {
        return res.status(400).json(new ApiError(400, "Password is required"))
    }
    const user = await User.findOne({
        email
    }, {
        _id: 1
    });
    if (user) {
        return res.status(400).json(
            new ApiResponse(400, "User with this phone no. or email already exists !")
        )
    }

    const newUser = await User.create({
        // phone,
        email,
        name,
        password
    });
    const {
        token,
        expiresAt
    } = generateToken({
        userId: newUser._id,
        role: newUser.role
    });

    res.cookie('jwt', token, {
        sameSite: 'none',
        secure: true
    });
    res.cookie("jwtExpiresAt", expiresAt, {
        sameSite: 'none',
        secure: true
    });

    const userObj = newUser.toObject();
    delete userObj.password;
    return res.json(new ApiResponse(200, "Registration completed successfully !", {
        token,
        expiresAt,
        user: userObj
    }))
})

const getUserInfo = asyncHandler(async (req, res) => {
    const {userId} = req.data;
    const user = await User.findById(userId, {password:0});
    if(!user){
        return res.status(404).json(new ApiError(404, "Invalid userId ! try again"))
    }

    return res.json(new ApiResponse(200, "User fetched successfully !", user))
})

const userController = {
    login, signup, getUserInfo
}
module.exports = userController