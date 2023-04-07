const express = require('express');
const routes = express.Router();
const admincontroller = require('../controller/admincontroller');
const passport = require('passport');
const Addmission=require('../models/addmission_model');

routes.get('/', admincontroller.Home);
routes.get('/admin',passport.checkAuthentication, admincontroller.admin_panel);
routes.get('/apis',admincontroller.apis)
routes.get('/register', admincontroller.register);
routes.post('/registerProcess', admincontroller.registerProcess);
routes.get('/login', admincontroller.login);
routes.post('/del_enq',admincontroller.del_enq);
routes.post('/loginProcess', admincontroller.loginProcess);
routes.post('/loginSession',passport.authenticate('m_rule', {failureRedirect : '/login',}),admincontroller.admin_deshbord);
routes.get('/add_enquiry',passport.checkAuthentication,admincontroller.add_enquiry);
routes.post('/add_enquiry_data',passport.checkAuthentication,admincontroller.add_enquiry_data)
routes.get('/add_admission',passport.checkAuthentication,admincontroller.add_admission)
routes.post('/add_addmission_data',passport.checkAuthentication,admincontroller.add_addmission_data)
routes.get('/view_addmission',passport.checkAuthentication,admincontroller.view_addmission)
routes.get('/view_addmission_profile/:id',passport.checkAuthentication,admincontroller.view_addmission_profile)
routes.get('/update_addmission/:id',passport.checkAuthentication,admincontroller.update_addmission_page)
routes.post('/grid',passport.checkAuthentication,admincontroller.grid)
routes.get('/grid_page',passport.checkAuthentication,admincontroller.grid_page)
routes.post('/update_admission_data',Addmission.uploadAvatar,passport.checkAuthentication,admincontroller.update_admission_data)
routes.get('/delete_enquiry/:id',passport.checkAuthentication,admincontroller.delete_enquiry)
routes.get('/update_enquiry/:id',passport.checkAuthentication,admincontroller.update_enquiry);
routes.post('/update_enquiry_data',passport.checkAuthentication,admincontroller.update_enquiry_data);

routes.post('/change_color',admincontroller.change_color)

routes.get('/logout', function(req, res,next){

    req.logout(function(err){

        if(err){
            console.log(err,"somethin wrong");
           
        }
        return res.redirect('/login')

    })

});


module.exports = routes;