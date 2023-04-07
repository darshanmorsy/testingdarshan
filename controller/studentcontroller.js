
const { model } = require('mongoose');
const admin = require('../models/admin_model');
const Addmission=require('../models/addmission_model');
const enquiry=require('../models/enquiry_model');
const path = require('path')
const nodemailer = require('nodemailer');
const fs=require('fs');

module.exports.dashbordsession =async function(req,res){
   
    console.log("login successfully");
     res.render('home',{user:req.user});
}

module.exports.student_profile = async (req, res) =>{
    console.log('data');
     data = await Addmission.findById(req.params.id,req.body);
     if(data){
        console.log(data);
        return res.render("student_profile",{
            profile:data
        })
     }
}

module.exports.checkmaile = function (req, res) {
    Addmission.findOne({ email: req.body.email }, function (err, userdata) {
        if (err) {
            console.log("something went wrong");
            return res.redirect('/back');
        }
        if (userdata) {
            var otp = Math.ceil(Math.random() * 10000)
            var transport = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: "18dde2c256f409",
                      pass: "cdc49a7186c986"
                    }
            });
            let info = transport.sendMail({
                from: 'jasminkoladiyamorsy@gmail.com',
                to: userdata.email, 
                subject: "testing node email" ,  
                text: "check OTP" ,
                html: `<h1>your OTP:${otp} </h1>`,
            });
            res.cookie('otp', otp);
            res.cookie('email', userdata.email);
            req.flash('success','OTP Send successfully');
            return res.render('checkotp')
        }
        else {
            return res.redirect('/back');
        }
    })
}

module.exports.verifyotp = function (req, res) {
    console.log(req.body.otp);
    if (req.body.otp == req.body.otp) {
        return res.render('generatenewpass');
    }
    else {
        req.flash('success','OTP Verification failed Enter correct OTP');
        console.log("OTP NOT Match Failed");
        return res.redirect('/checkotp');
    }
}

module.exports.newpass = function (req, res) {
    if (req.body.npass == req.body.cpass) {
        Addmission.findOne({ email: req.cookies.email }, function (err, record) {
            if (err) {
                console.log(err);
                return res.redirect('back');
            }
            if (record) {
                console.log(record, 'Created record');
                Addmission.findByIdAndUpdate(record.id, {
                    password: req.body.npass
                }, function (err) {
                    if (err) {
                        return res.redirect('back');
                    }
                    else {
                        req.flash('success'," password Created successfully ");
                        return res.render('home');
                    }
                })
            }
        })
    }
    else {
        console.log("password not created");
        req.flash('success','Check your password ');
        return res.redirect('/generatenewpass');
    }
}
