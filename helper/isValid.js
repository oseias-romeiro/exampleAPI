const { validationResult, check } = require('express-validator');

// register validations
const validRegister = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('password2').custom((value, {req}) => {
        if (value != req.body.password) throw new Error('Passwords do not match');
        else return true
    }),
    check('role').isIn(['ADMIN', 'USER']).withMessage('Invalid role'),
]
const validRegisterMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.errors[0].msg)
        return res.redirect('signup')
    }
    next()
}

// update user profile validations
const validUpdateUser = [
    check('name').notEmpty().withMessage('Name is required'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('password2').custom((value, {req}) => {
        if (value != req.body.password) throw new Error('Passwords do not match');
        else return true
    }),
    check('role').isIn(['ADMIN', 'USER']).withMessage('Invalid role'),
]
const validUpdateUserMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.errors[0].msg)
        return res.redirect('profile')
    }
    next()
}

module.exports = {validRegister, validRegisterMiddleware, validUpdateUser, validUpdateUserMiddleware}

