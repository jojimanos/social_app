const { get } = require('http')
const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 12,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: "subscriber"
    },
    resetPasswordLink: {
        data: String,
        default: ""
    }
}, { timestamps: true })

//virtual fields
userSchema.virtual('password')
set(function (password) {
    //create temp variable called password
    this._password = password
    //generate salt
    this.salt = this.makeSalt()
    //encrypt password
    this.hashed_password = this.encryptPassword(password)
})
get(function () {
    return this._password
})
//methods >authenticate, exportPassword, salt
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) == this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return ''
        }
    },

    makeSalt: function () {
        return Math.random(Date().valueOf * Math.random()) * ''
    }
}
//export user model

module.exports = mongoose.model('User', userSchema)