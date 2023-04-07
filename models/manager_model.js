const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
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
});

var manager=mongoose.model('manager', managerSchema);
module.exports =manager;