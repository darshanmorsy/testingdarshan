
const { model } = require('mongoose');
const manager = require('../models/manager_model');
const Addmission = require('../models/addmission_model');
const enquiry = require('../models/enquiry_model');
const path = require('path')

module.exports.manager_login = (req, res) => {
    req.flash('success','Manager Login Successfully');
    return res.render('manager_login')

}
module.exports.manager_home = (req, res) => {

    return res.render('manager_home');

}

module.exports.manager_register = (req, res) => {
    res.render('manager_register');
}

module.exports.managersession = (req, res) => {
    res.render('manager_home');
}

module.exports.registerProcess = (req, res) => {
    console.log(req.body);
    manager.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        if (data) {
            console.log("Already register.");
            return res.redirect('back');
        }
        else {
            if (req.body.password == req.body.cpassword) {
                manager.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return false;
                    }

                    return res.redirect('/manager');
                });
            }
            else {
                console.log("Password and Confirm Password are not match.");
                return res.redirect('back');
            }
        }
    });
}


module.exports.loginProcess = async (req, res) => {

    manager.findOne({ email: req.body.email }

        , function (err, data) {
            if (err) {
                console.log(err);
                return false;
            }
            if (data) {
                if (data.password == req.body.password) {
                    return res.redirect('/manager/manager_home');
                }
                else {
                    console.log("password not match");
                    return res.redirect('back');
                }
            }
            else {
                console.log("Invalid Email.");
                return res.redirect('back');
            }
        }
    )
}
