
const isAuthed = (req, res, next)=>{
    if(req.session && req.session.user){
        return next();
    }else {
        req.flash("error", "Need login!")
        res.redirect('/account/login')
    }
}


module.exports = isAuthed
