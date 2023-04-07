const mongoose = require('mongoose');

const enquirySchema = mongoose.Schema({
    name : {
        type : String,
        required : 'This field is required.'
    },
    date : {
        type : String,
        required : 'This field is required.'
    },
    field: {
        type : String,
        required : 'This field is required.'
    },
    phone:{
        type : String,
        required : 'This field is required.'
    },
    color:{
        type : String,
        required : 'This field is required.'
    },
    resoan:{
        type: String,

    }
});

var enquiry=mongoose.model('enquiry', enquirySchema);
module.exports = enquiry