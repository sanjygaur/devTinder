const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
         required: true,
         minlength: 4,
         maxlength: 50,
    },
    lastName: {
        type: String,
       
        
    },
    email: {    
        type: String,
         required: true,
         lowercase: true,
         unique: true,
         trim: true,
         match: [/\S+@\S+\.\S+/, 'is invalid'],
        //     validate(value) {
        //    if (!validator.isEmail(value)) {
        //          throw new Error('Invalid email format');
        //     }   
        // }

    },
    password: {
        type: String,
 required: true,
// validate(value) {
//             if (!validator.isStrongPassword(value)) {
//                 throw new Error('enter strong Password must be at least 6 characters long');
//             }   
//         }
        
    },
    age: {
        type: Number,
        min: [18, 'Age must be at least 18'],
              
    },
    gender: {
        type: String,
        validate(value) {
            const allowedGenders = ['male', 'female', 'Other'];
            if (!allowedGenders.includes(value)) {      
                throw new Error('Gender must be either  Male, Female, or Other');
            }   
        }

        
    },  
   skills: {
    type: [String],
    validate(value) {
        if (!Array.isArray(value)) {
            throw new Error('Skills must be an array of strings');
        }
    }
   }
},
{
    timestamps: true // ✅ CORRECT PLACE
  }
);

userSchema.methods.getJwtToken = async function() {

    const user = this; // 'this' refers to the user document
   const token = await jwt.sign({ id: user._id }, "sanjay@Devtinder$34", {
       expiresIn: "7d",
   });
    return token;
}
userSchema.methods.validatePassword = async function(passwordInputByUser) {

    const user = this; // 'this' refers to the user document
    const passwordHash = user.password; // Get the hashed password from the user document
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash); // Compare the provided password with the hashed password
    return isPasswordValid;
}

module.exports =  mongoose.model('User', userSchema);