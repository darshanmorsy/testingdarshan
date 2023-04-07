var passport = require('passport');
const User = require('../models/admin_model');
const manager = require('../models/manager_model');
var passportLocalss = require('passport-local').Strategy;
const enquiry = require('../models/enquiry_model');
const http = require('http');

passport.use('m_rule',new passportLocalss({
    usernameField : "email"    
}, function(email,password,done){
    User.findOne({email : email}, function(err,user){
        if(err)
        {
            console.log(err);
            return done(null,err);
        }
        if(!user || user.password != password)
        {
            console.log(user);
            return done(null, false);
        }
        return done(null,user);
    });
}));


passport.serializeUser(function(user,done){
    return done(null, user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err)
        {
            console.log(err);
        }
        return done(null,user);
    })
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}




module.exports = passport;