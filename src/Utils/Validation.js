const validator = require('validator');
const validateSignUpData = (req) => {
    const { firstName,lastName, email, password, age } = req.body;
    if(!firstName || !lastName || !email) {
        throw new Error("firstName, email, and lastName are required fields");
    }
   else if(validator.isEmail(email) === false) {
        throw new Error("Invalid email format");
    }
    else if(validator.isStrongPassword(password) === false) {
        throw new Error("Password must be at least 6 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols");
    }
};
 
module.exports = {
    validateSignUpData
};