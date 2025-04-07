const {body, validationResult} = require("express-validator");
const {messageTypes} = require("../exceptions/responsesFormat")




// ================= auth validation tools ==============
const authDataValidation = () => [
    body("mobileNumber").notEmpty().matches(/((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g).withMessage("mobileNumber is not valid!"),
    body("fullName").optional().isString().withMessage("format of fullName is not correct!")
]

const authGetOTPpathValidation = () => {
    // do somethings ....!
}

// create middleware
const authValidationObjGen = (req,res,next) => {
    const pureErrors = validationResult(req)?.errors; // pureErrors is "object" | pureErrors.errors is an "Array"
    // pureErros is an Array!
    if(pureErrors.length === 0){
        return next()
    }
    const errorsObj = {};
    pureErrors.forEach((errorField) => {
        // errorField is an object => {type : - ,value : - ,msg : - ,path : - ,location : - }
        // if not exists
        if(!errorsObj[errorField.path]){
            errorsObj[errorField.path] = {
                message : [errorField.msg]
            }
        // if already exists => use spread opterators for deep copy of array
        }else{
            errorsObj[errorField.path] = {
                message : [...errorsObj[errorField.path].message,errorField.msg]
            }
        }
 
    })
    next({statusCode : 400,message : messageTypes.badRequestValidation,errors : errorsObj})
}





module.exports = {
    authDataValidation,
    authValidationObjGen
}






