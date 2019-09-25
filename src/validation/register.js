const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
   
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    
    data.usernamer = !isEmpty(data.username) ? data.username : "";
    
    data.passwordr = !isEmpty(data.password) ? data.password : "";
    data.password2r = !isEmpty(data.password2) ? data.password2 : "";// Name checks
    
    
    
    if (Validator.isEmpty(data.usernamer)) {
        errors.usernamer = "Username field is required";
    }
    // Email checks
   
    

    // Password checks
    if (Validator.isEmpty(data.passwordr)) {
        errors.passwordr = "Password field is required";
    }if (Validator.isEmpty(data.password2r)) {
        errors.password2r = "Confirm password field is required";
    }if (!Validator.isLength(data.passwordr, { min: 3, max: 30 })) {
        errors.passwordr = "Password must be at least 3 characters";
    }if (!Validator.equals(data.passwordr, data.password2r)) {
        errors.password2r = "Passwords must match";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
    
};