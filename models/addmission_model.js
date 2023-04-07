var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var AVATAR_PATH = ('/uploads/admin');
var addmissionSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    dob:{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    } ,
    phone : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    studyin:{
        type : String,
        required : true
    },
    institute_name:{
        type : String,
        required : true
    },
    father_name:{
        type : String,
        required : true
    },
    edu_qualification_father:{
        type : String,
        required : true
    },
    father_phone:{
        type : String,
        required : true
    },
    cource : {
        type : String,
        required : true
    },
    fees:{
        type : String,
        required : true
    },
    avatar:{
        type : String,
        required : true
    },
    password: {
        type : String
    },
    paid_fees:{
        type:String,
    }
    ,pending_fees:{
        type:String
    },
    grid:{
        type:String
    }
});
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename : function(req, file, cb){
        cb(null, file.fieldname+"-"+Date.now());
    }
});

addmissionSchema.statics.uploadAvatar = multer({
    storage : storage
}).single('avatar');

addmissionSchema.statics.avatarpath = AVATAR_PATH;


var Addmission = mongoose.model('Addmission', addmissionSchema);

module.exports = Addmission;