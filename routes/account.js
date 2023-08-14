const express = require('express')
const router = express.Router()

const {verifyUser, createUser, destroyUser, updateUser} = require('../controllers/user')
const isAuthed = require('../helper/isAuthed')
const isAdmin = require('../helper/isAdmin')
const {validRegister, validRegisterMiddleware, validUpdateUser, validUpdateUserMiddleware} = require('../helper/isValid')


router.get('/login', (req,res) => res.render('account/login', { csrfToken: req.csrfToken() }))

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await verifyUser(email, password);
    if (user) {
        req.session.user = {id: user.id, email: user.email, name: user.name, role: user.role}
        req.flash('success', 'User logged with success')
        res.redirect('/home')
    } else {
        req.flash('error', 'Invalid inputs');
        res.redirect('login');
    }
})

router.get('/signup', (req,res)=> res.render('account/signup', { csrfToken: req.csrfToken() }))

router.post('/signup', validRegister, validRegisterMiddleware, async (req,res)=> {
    const { name, email, password, role } = req.body;

    const user = await createUser(name, email, password, role);
    if (user) {
        req.flash('success', 'user created with success')
        res.redirect('login')
    }else {
        req.flash('error', 'Error persisting data')
        res.redirect('signup')
    }
})

router.get('/remove/:id', isAuthed, isAdmin, async (req,res) => {
    const id = req.params.id;
    try {
        if(id == req.session.user.id){
            throw new Error('You can not remove yourself')
        }else{
            const result = await destroyUser(id)
            if (result) {
                req.flash('success', 'user removed with success')
                res.redirect('/home')
            }else {
                throw new Error('Its not possible removing user')
            }
        }
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/home')
    }
})

router.get('/profile', isAuthed, (req,res) => res.render('account/profile', { csrfToken: req.csrfToken() }))

router.post('/profile', validUpdateUser, validUpdateUserMiddleware, isAuthed, async (req,res) => {
    const { id, name, password, role } = req.body
    const user = await updateUser(id, name, password, role);
    if (user) {
        req.session.user.name=name
        req.session.user.role=role
        req.flash('success', 'user edited with success');
        res.redirect('/home');  
    }else {
        req.flash('error', 'Error persisting data')
        res.redirect('profile')
    }
})

router.get('/delete', isAuthed, async (req,res) => {
    try {
        const result = await destroyUser(req.session.user.id, true)
        if (result) {
            req.session.user = null
            req.flash('success', 'User data deleted!')
            res.redirect('/')
        }else {
            throw new Error('Its not possible removing admin user')
        }
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('profile')
    }
})

router.get('/logout', isAuthed, (req,res)=>{
    req.session.user = null
    req.flash('info', "Logged out.")
    res.redirect('/')
})

module.exports = router;
