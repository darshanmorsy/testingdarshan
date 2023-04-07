
const { model } = require('mongoose');
const admin = require('../models/admin_model');
const Addmission = require('../models/addmission_model');
const enquiry = require('../models/enquiry_model');
const path = require('path')
const fs = require('fs');
const { log } = require('console');
const { Admin } = require('mongodb');

module.exports.Home = async (req, res) => {

    res.render('home');
}
module.exports.admin_deshbord = async (req, res) => {
    req.flash('success','Admin Login Success');
    return res.redirect('/admin')
}

module.exports.apis = async (req, res) => {

    var ds = await admin.find({});
    var admission = await Addmission.find({})
    return res.json({ status: 200, title: 'darshan', userId: 12344, id: 12 })

}

module.exports.admin_panel = async (req, res) => {

    var enq_data = await enquiry.find({});
    var admission_data = await Addmission.find({});
    var admin_data = await admin.find({});


    return res.render('admin_panel',
        {
            enq_data: enq_data,
            admission_data: admission_data,
            admin_data: admin_data
        })

}


module.exports.del_enq = async (req, res) => {

    var del_enq = await enquiry.findOneAndDelete(req.body.id);
    if (del_enq) {
        console.log('data deleyted');
    }
}


module.exports.register = (req, res) => {
    res.render('register');
}

module.exports.registerProcess = (req, res) => {
    admin.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        if (data) {
            console.log("Already register");
            req.flash('success','Already Register');
            return res.redirect('back');
        }
        else {
            if (req.body.password == req.body.cpassword) {
                admin.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return res.redirect('back');
                    }
                    return res.redirect('/login');
                });
            }
            else {
                console.log("Password and Confirm Password are not match.");
                return res.redirect('back');
            }
        }
    });
}

module.exports.login = (req, res) => {
    res.render('login');
}

module.exports.loginProcess = async (req, res) => {
    data = admin.findOne({ email: req.body.email })
    if (data) {
        console.log('hello');
    }
}





module.exports.add_enquiry = async (req, res) => {
    return res.render('add_enquiry')

}


module.exports.add_enquiry_data = async (req, res) => {
    enquiry.findOne({ phone: req.body.phone }, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        if (data) {
            console.log("number already exist.");
            return res.redirect('back');
        }
        else {
            req.body.color='#fa4e576e';
            record = enquiry.create(req.body);
            if (record) {
              req.flash('success','Enquiry add successfully');
                return res.redirect('back');
            }
        }

    })

}
module.exports.update_enquiry =async(req,res)=>{

    console.log(req.params.id);
    enquiry.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        return res.render('update_enquiry', {
            datas: data
        })
    })

}

module.exports.update_enquiry_data = async(req,res)=>{
    console.log(req.params.id,'ggggggggggggggggg');
    var data=await enquiry.findByIdAndUpdate(req.body.id,{resoan:req.body.resoan});
    if(data){
        console.log(data,'updated successfully');
        return res.redirect('/admin')

    }
    else{
        return res.redirect('back')
    }
    admin.findByIdAndUpdate(req.params.id, function(err, data){
        
        if(err){
            console.log(err);
        }
        return res.redirect('/admin')
    })
}

module.exports.change_color=async (req,res)=>{
    // log('change_color')
    // console.log(req.body.id);
    var enq = await enquiry.findByIdAndUpdate(req.body.id,{color:'#00800042'});
    if (enq) {
        setInterval(async function(){
            
            var ss = await enquiry.findByIdAndUpdate(req.body.id,{color:'#fa4e576e'});

        },8000)
        return res .redirect('/admin')
    }
}

module.exports.delete_enquiry = async (req, res) => {
    var delete_enquiry = await enquiry.findByIdAndDelete(req.params.id);
    if (delete_enquiry) {
        req.flash('success', 'delete Enquiry successfully');
        return res.redirect('/admin');
    }

}

module.exports.add_admission = async (req, res) => {
    return res.render('add_addmission')
}



module.exports.add_addmission_data = async (req, res) => {
    var imgPath = '';
    Addmission.uploadAvatar(req, res, async function () {

        if (req.file) {
            imgPath = Addmission.avatarpath + "/" + req.file.filename;
        }
        req.body.avatar = imgPath;

        
        var paid_fees=req.body.paid_fees;
        if(paid_fees){
            console.log('hello');
            var fees=req.body.fees;
            var pending_fees=fees-paid_fees;
            req.body.pending_fees = pending_fees;
        }
        data = await Addmission.create(req.body)
        if (data) {
            req.flash('success', 'addmission added successfully');
            return res.redirect('/grid_page');
        }
    });
}

module.exports.grid_page =async(req,res)=>{

    Addmission.find({},(err, results) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(results);
        return res.render('grid',{data:results})
      });
        
    }

module.exports.view_addmission = async (req, res) => {
    Addmission.find({}, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        return res.render('view_admission', {
            data: data
        })
    })

}

module.exports.grid=async(req,res)=>{

       data= await Addmission.findByIdAndUpdate(req.body.grid_id,req.body);
    
    }

module.exports.view_addmission_profile = (req, res) => {
    Addmission.findById(req.params.id, function (err, addmission) {
        if (err) {
            console.log(err);
            return false;
        }
        res.render('view_addmission_profile', {
            profile: addmission

        })
    })
}

module.exports.update_addmission_page = function (req, res) {
    Addmission.findById(req.params.id, function (err, record) {
        if (err) {
            console.log(err);
            return false;
        }
        return res.render('update_addmission_page', {
            data: record
        });
    });
}

module.exports.update_admission_data = async (req, res) => {
    if (req.file) {
        var dataid = await Addmission.findById(req.body.id);
        if (dataid.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", dataid.avatar));

            var imgPath = Addmission.avatarpath + "/" + req.file.filename;
            req.body.avatar = imgPath;

            var updatedata = await Addmission.findByIdAndUpdate(req.body.id, req.body);
            if (updatedata) {
                req.flash('success', 'Addmission Update successfully');
                return res.redirect('/view_addmission');
            }
            else {
                return false
            }

        }
    }

    else {
        adminssiondata = await Addmission.findById(req.body.id);
        if (adminssiondata.avatar) {
            imgPath = adminssiondata.avatar;
        }
        req.body.avatar = imgPath;
        adminssiondata = await Addmission.findByIdAndUpdate(req.body.id, req.body);
        if (adminssiondata) {
            req.flash('success', 'Addmission Update successfully');
            return res.redirect('/view_addmission');
        }
        else {
            return false
        }
    }
}

