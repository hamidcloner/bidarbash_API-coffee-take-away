const autoBind = require("auto-bind");
const authModel = require("./auth.model");
const crypto = require("crypto");
const StatusGlobalMessages = require("@common/constant/resGlobalMessages.enum");
const AuthMessages = require("@modules/Auth/auth.messages");
const {messageTypes,failedResponse} = require("../../common/exceptions/responsesFormat");
const JWT = require("jsonwebtoken");
require("dotenv").config();


class AuthService{
    #model; // private property
    #allowedTime = 1*60*1000 // 1 minutes
    constructor(){
        autoBind(this);
        this.#model = authModel;
    }
    async OTPgenerator(mobile){

        const OTPcodeValue = crypto.randomInt(1000,10000);
        const invokedTime = new Date().getTime(); // each time login method is calling
        const OTPexpiredInTime = invokedTime + this.#allowedTime;

        const applicantUser = await this.isApplicantUserExistingByMobile(mobile);
        if(!applicantUser){
            const newUserAdded = await this.#model.create({
                mobileNumber : mobile
            })
            newUserAdded.OTPcode = {
                code : OTPcodeValue,
                expiredIn : OTPexpiredInTime
            }
            await newUserAdded.save();
            return newUserAdded;
        }
        if(invokedTime < applicantUser?.OTPcode?.expiredIn){
            // OTP code not expired-in yet!
            throw failedResponse(StatusGlobalMessages?.BadRequestValidation,400,{otp : messageTypes?.authOTPnotExpired})
        }else{
            // OTP code was expiredIn => try to generate new OTPcode
            applicantUser.OTPcode = {
                code : OTPcodeValue,
                expiredIn : OTPexpiredInTime
            }
            await applicantUser.save()
        }
        return applicantUser;
    }
    async checkCorrectOTP(mobile,receivedOTPcode){
        const applicantUser = await this.isApplicantUserExistingByMobile(mobile);
        if(!applicantUser){
            throw failedResponse(StatusGlobalMessages?.BadRequestValidation,400,{mobileNumber : AuthMessages?.MobileNumberNotFound})
        }   
        const correctOTPcode = applicantUser.OTPcode.code;
        const validExpiredInTime = applicantUser.OTPcode.expiredIn;
        // check OTP-code && expiredIn
        if(correctOTPcode === receivedOTPcode && Date.now() < validExpiredInTime){
            applicantUser.verifiedMobile = true;
            applicantUser.OTPcode.code = "";
            // save for update "verifiedMobile" to true && "OTPcode.code" to empty string 
            await applicantUser.save();
            // create payload and return it to create JWT token
            let applicantUserPayload = {
                id : applicantUser._id,
                mobile : applicantUser.mobileNumber
            };
            return applicantUserPayload;
        }
        else{
            throw failedResponse(StatusGlobalMessages?.BadRequestValidation,400,{OTP : AuthMessages?.IncorrectTimeOTPcode})
        }
        
    }
    async isApplicantUserExistingByMobile(mobile){
        const applicantUser = await this.#model.findOne({mobileNumber : mobile});
        return applicantUser;
    }
    jwtTokenGenerate(payload){
        if(Object.keys(payload).length === 0){
            throw {status : 500,message : `"payload argument must be object and not empty!"`}
        }
        return JWT.sign(payload,process.env.JWT_SECRET_KEY,{
            expiresIn : "70d",
        })
    }





    // ================= TEST ===============================
    // booking newUser into db (if not exists) AND return the user 
    async applicantUserBooking(mobile){
        const applicantUser = await this.#model.findOne({mobileNumber : mobile});
        if(!applicantUser){
            const newUserCreated = await this.#model.create({
                mobileNumber : mobile
            })
            return newUserCreated;
        }
        return applicantUser;
    }
    async getAllUsers(){
        const allUser = await this.#model.find({});
        return allUser;
    }
    async getSpcificDocField(yourField,mobile){
        const returnedUser = await this.#model.findOne({mobileNumber : mobile});
        return returnedUser[yourField];
    }
    async setOTPonDoc(otpValue,mobile){
        const returnedUser = await this.#model.updateOne({mobileNumber : mobile},{$set : {OTPcode : otpValue}});
        const modifiedUser = await this.#model.findOne({mobileNumber : mobile});
        return modifiedUser;
    }

}



module.exports = new AuthService();