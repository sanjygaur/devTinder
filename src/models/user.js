const mongoose = require('mongoose');
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

    },
    password: {
        type: String,
 required: true,

        
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