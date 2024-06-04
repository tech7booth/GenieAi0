const { connectDb } = require('../configs/db.config');
const { Schema, model, models } = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    // phone: {
    //     type: Number,
    //     trim: true,
    //     unique: false
    // },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
}, {
    timestamps: true
});


userSchema.methods.checkPassword = async function (password) {
    try {
        console.log("Checking password:", password, this.password);
        const match = await bcrypt.compare(password, this.password);
        return match;
    } catch (err) {
        throw new Error(`Error checking password: ${err}`);
    }
};

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified('password') || this.isNew) {
            const salt = await bcrypt.genSalt(saltRounds);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (err) {
        next(new Error(`Error hashing password: ${err}`));
    }
});

const User = models.User || model("User", userSchema);
module.exports = User;
