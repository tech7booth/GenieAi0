exports.asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        console.log('Error:', err);
        return res.status(err.statusCode || 500).send(
            new this.ApiError(500, err.message || "Internal Server Error ! please try later." , err.message, err.stack)
        )
    };
}

exports.ApiResponse = class {
    constructor(statusCode, message, data) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message || "Successfull !";
        this.data = data || null;
    }
}

exports.ApiError = class {
    constructor(statusCode, message = "Internal server error ! try later." , error, stack) {
        this.success = false;
        this.statusCode = statusCode || 500;
        this.message = message ;
        this.error = error || [];
        this.data = null;

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}