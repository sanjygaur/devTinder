const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
         required: true,
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
            validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format');
            }   
        }

    },
    password: {
        type: String,
 required: true,
validate(value) {
            if (!validator.isStrongPassword(value, { minLength: 6 })) {
                throw new Error('enter strong Password must be at least 6 characters long');
            }   
        }
        
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


module.exports =  mongoose.model('User', userSchema);