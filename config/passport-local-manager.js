var passport = require('passport');
const manager = require('../models/manager_model');
var passportLocals = require('passport-local').Strategy;
// const enquiry = require('../models/enquiry');

passport.use('manager_rule',new passportLocals({
    usernameField : "email"    
}, function(email,password,done){
    manager.findOne({email : email}, function(err,user){
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
    manager.findById(id, function(err, user){
        if(err)
        {
            console.log(err);
        }
        return done(null,user);
    })
});

passport.checkAuthentications = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('success','Manager Login Success');
    return res.redirect('/manager');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;