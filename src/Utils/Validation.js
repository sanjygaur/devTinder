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
const validateEditProfileData = (req) => {
    const allowedUpdates = [
        "firstName",
        "lastName",
        "gender",
        "age",
        "skills",
        "photoUrl",
        "about"
    ];

    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((key) =>
        allowedUpdates.includes(key)
    );

    if (!isValidOperation) {
        const invalidFields = updates.filter(
            (key) => !allowedUpdates.includes(key)
        );
        throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
    }
};

module.exports = {
    validateEditProfileData
};

module.exports = {
    validateSignUpData,
    validateEditProfileData
};