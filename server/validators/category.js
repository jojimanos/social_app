const { check } = require('express-validator');

exports.categoryCreateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('First name is required'),
    check('image')
        .isEmpty()
        .withMessage('image is required'),
    check('content')
        .isLength({ min: 20 })
        .withMessage('Content is required'),
]

exports.categoryUpdateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('First name is required'),
    check('content')
        .isLength({ min: 20 })
        .withMessage('Content is required'),
]