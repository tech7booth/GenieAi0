const jwt = require('jsonwebtoken');

const secret = process.env.JWT_TOKEN || 'T7&3#r45%21E945$8#@90k3#9!1O890MI';
const expiresIn = parseInt(process.env.JWT_EXPIRYO)*24*60*60 || 30*24*60*60 ;

/**
 * Generate signed JWT token
 * @param {object} data - Data to be signed in the token
 * @returns {object} - Signed JWT token and expiration time
 */
exports.generateToken = (data) => {
    try {
        if (!secret) throw new Error("JWT secret not found");

        const expiresAt = Date.now() + expiresIn*1000
        // generate token
        const token = jwt.sign(data, secret, { expiresIn });

        console.log(expiresIn)
        return { token, expiresAt };
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} - Verification status and data
 */
exports.verifyToken = (token) => {
    try {
        const data = jwt.verify(token, secret);
        return { status: true, data };
    } catch (error) {
        return { status: false, data: null, message:error.message };
    }
};
