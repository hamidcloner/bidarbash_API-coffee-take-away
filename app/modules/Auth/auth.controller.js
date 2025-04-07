const service = require("./auth.services");
const autoBind = require("auto-bind");
const {successResponse,messageTypes, failedResponse} = require("../../common/exceptions/responsesFormat");
const AuthMessages = require("@modules/Auth/auth.messages");
const StatusGlobalMessages = require("@common/constant/resGlobalMessages.enum") 





class AuthController{
    #service // is private filed
    constructor(){
        autoBind(this);
        this.#service = service;
    }
    async sendOTP(req,res,next){
        const {mobileNumber} = req.body;
        try{
            const acceptedUser = await this.#service.OTPgenerator(mobileNumber);
            res.status(200).json(successResponse(messageTypes?.authSendOTP,200,{otp : acceptedUser.OTPcode.code}))
        }catch(err){
            next(err)
        }
    }
    async checkOTP(req,res,next){
        try{
            const {mobileNumber,otp} = req.body;
            if(!otp){
                // Bad Request 
                return res.status(400).json(failedResponse(StatusGlobalMessages?.BadRequestValidation,400,{
                    otp : AuthMessages?.OtpNotSend
                }))
            }      
            // if(this.#service.checkCorrectOTP(mobileNumber,otp)){
            //     return res.status(200).json(successResponse(messageTypes?.authSuccessfullyOTP,200))
            // }
            const payload = await this.#service.checkCorrectOTP(mobileNumber,otp);
            const token = this.#service.jwtTokenGenerate(payload);
            return res.status(200).json(successResponse(messageTypes?.authSuccessfullyOTP,200,{
                token,
                message : "Dear developer!please store this token in localStorage OR cookies on front-end side"
            }))

        }catch(error){
            next(error)
        }
  
    }

}


module.exports = new AuthController();