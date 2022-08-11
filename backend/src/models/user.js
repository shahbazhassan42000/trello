import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'can\'t be blank'],
        match: [/^[a-zA-z\d]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'can\'t be blank'],
        match: [/^[a-z\d!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?$/, 'is invalid']
    },
    image: {type: String, default: 'https://i.imgur.com/zHNsP0J.png'},
    role: {type: String, required: [true, 'must have a role']},
    hash: String,
    salt: String

}, {timestamps: true});

userSchema.plugin(uniqueValidator);

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.toAuthJSON = function () {
    return {
        id: this._id,
        idType: typeof this._id,
        username: this.username,
        token: this.generateJWT(),
        email: this.email,
        image: this.image,
        role: this.role
    };
};

userSchema.methods.generateJWT = function () {
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 60);
    return jwt.sign({
            id: this._id,
            username: this.username,
            expiryDate: parseInt(expiryDate.getTime() / 1000)
        }
        , config.secretKey);
};

mongoose.model('users', userSchema);

