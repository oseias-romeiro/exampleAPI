
const isAdmin = (req, res, next)=>{
    if(req.session.user && req.session.user.role === "ADMIN"){
        return next();
    }else {
        req.flash("error", "You are not an admin user!")
        res.redirect('/')
    }
}


module.exports = isAdmin
