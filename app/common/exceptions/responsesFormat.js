
const messageTypes = {
    authSendOTP : "OTP sent successfully!",
    authMobileNumberFailed : "Invalid mobile number",
    authSuccessfullyOTP : "OTP confirm successFully! | User logged in successFully!",
    authFailed : "authentication credentials missing or incorrect",
    // badRequestValidation : "Validation errors in your request",
    authOTPnotExpired : "The otp code has not expired, please try again later",
    authNotSentMobileNumber : "Mobile number has not been sent",
    // authReceivedIncorrectTimeOTPcode : "OTP code is incorrect | OTP code time was expired!" 
    
}


// ================ Authentication Response =======================
const authSuccessResGen = (message,data) => ({
    success : true,
    statusCode : 204,
    message : message ?? messageTypes?.authSuccessfullyOTP,
    data : data ?? {}
})


// When the wrong OTP is sent
// authentication was failed
const authFailedResGen = (message,errors) => ({
    success : false,
    statusCode : 401,
    message : message ?? messageTypes.authFailed,
    errors : errors ?? {
        OTP : [messageTypes?.authIncorrectOTP]
    }
})


// Bad Request => mobile-number was wrong
const authBadReqResGen = (message,errors) => ({
    success : false,
    statusCode : 400,
    message : messageTypes?.badRequestValidation,
    errors : errors ?? {
        mobileNumber : message ?? messageTypes?.authMobileNumberFailed
    }
})


const successResponse = (message,statusCode,data = {}) => ({
    success : true,
    statusCode,
    message, // a general message
    data
})

const failedResponse = (message,statusCode,errors = {}) => ({
    success : false,
    statusCode,
    message, // a general message
    errors
})

/**
 * errors 
 * {
 *      "fieldName" : {
 *          message : ""
 *       },
 *       "fieldName" : {
 *          message : ""
 *       }
 * }
 */

module.exports = {
    messageTypes,
    successResponse,
    failedResponse
}




// ==================== HTTP verbs Responses ==================