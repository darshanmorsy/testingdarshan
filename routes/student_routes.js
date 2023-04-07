const express = require('express');
const routes = express.Router();
const Studentaddmission = require('../controller/studentcontroller');
const passport = require('passport');
routes.post( "/student_corner_login",   passport.authenticate("student_rule", { failureRedirect: "/" }),Studentaddmission.dashbordsession);
routes.get("/student_corner/:id",Studentaddmission.student_profile)
routes.post('/checkmaile',Studentaddmission.checkmaile)
routes.post('/verifyotp', Studentaddmission.verifyotp);
routes.post('/newpass', Studentaddmission.newpass);
routes.get('/student/logout',function(req, res,next){

    req.logout(function(err){

        if(err){
            console.log(err,"somethin wrong");
           
        }
        return res.redirect('/');

    })

});
module.exports=routes;