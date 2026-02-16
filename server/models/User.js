const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name : {type : String, required : true},
        email : {type : String, required : [true, "Email is required"], lowercase:true, unique: true, trim: true},
        password : {type : String, required : [true, "password is required"]}
    },
    {
        timestamps : true
    }
);


module.exports = mongoose.model("User", userSchema);