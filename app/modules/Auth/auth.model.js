const {default : mongoose} = require("mongoose");



const OTPschema = new mongoose.Schema({
    code : {
        type : String,
        required : false
    },
    expiredIn : {
        type : String,
        required : false
    }
})


const authSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : false,
    },
    OTPcode : {
        type : OTPschema,
        // default : 0,
        required : false
    },
    mobileNumber : {
        type : String,
        required : true,
        unique : true
    },
    verifiedMobile : {
        type : Boolean,
        required : true,
        default : false
    }
})


const authModel = mongoose.model("auth",authSchema);
module.exports = authModel;


