const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : 'This field is required.'
    },
    email : {
        type : String,
        required : 'This field is required.'
    },
    password : {
        type : String,
        required : 'This field is required.'
    },
},{
    timesstamps: true,
});

var admin=mongoose.model('Admin', userSchema);
module.exports =admin