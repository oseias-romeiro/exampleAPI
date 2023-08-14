const express = require('express')
const router = express.Router()
const isAuthed = require('../helper/isAuthed')

const {getAllUsers} = require('../controllers/user')

router.get('/', isAuthed, async(req,res) =>
    res.render('home', { users: await getAllUsers(), isAdmin: req.session.user.role == "ADMIN" })
)


module.exports = router;
