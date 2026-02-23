const mongoose = require('mongoose');


const connectDB = async () => {
   
        await mongoose.connect('mongodb+srv://sanjaygaur179_db_user:OFDDtmHw4vQyjg6C@cluster0.aqyp75p.mongodb.net/');
       
};



module.exports = connectDB;
// const uri ="mongodb+srv://sanjaygaur179_db_user:OFDDtmHw4vQyjg6C@cluster0.aqyp75p.mongodb.net/";