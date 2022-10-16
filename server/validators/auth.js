const { check } = require('express-validator');

exports.userRegisterValidator = [
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('First name is required'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage('Last name is required'),
    check('email')
        .isEmail()
        .withMessage('must be a valid email address'),
    check('birthDate')
        .not()
        .isEmpty()
        .withMessage('Birth date is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
]

exports.userLoginValidator = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('email is required'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Birth date is required')
]

exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('email is required'),
]

exports.resetPasswordValidator = [
    check('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('resetPasswordLink')
        .not()
        .isEmpty()
        .withMessage('Token is required')
]