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
        .not()
        .isEmpty()
        .withMessage('email is required'),
    check('birthDate')
        .not()
        .isEmpty()
        .withMessage('Birth date is required')
]