import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        validate: [validator.isEmail, 'Invalid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.compatePasswords = function (clientPassword) {
    return bcrypt.compareSync(clientPassword, this.password);
}


userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: parseFloat(process.env.JWT_EXPIRE)
    });
}

const User = mongoose.model('User', userSchema);

export default User;