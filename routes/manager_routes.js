const express = require('express');
const routes = express.Router();
const managercontroller = require('../controller/managercontroller');
const passport = require('passport');
routes.get('/',managercontroller.manager_login)
routes.get('/manager_register',managercontroller.manager_register);
routes.post('/registerProcesss',managercontroller.registerProcess);
routes.post('/loginprocess',managercontroller.loginProcess);
routes.post( "/managersession",   passport.authenticate("manager_rule", { failureRedirect: "/manager" }),managercontroller.managersession);
routes.get('/manager_home',passport.checkAuthentication,managercontroller.manager_home);
routes.get('/logout',function(req, res,next){

    req.logout(function(err){

        if(err){
            console.log(err,"somethin wrong");
           
        }
        return res.redirect('/manager')

    })

});


module.exports=routes;