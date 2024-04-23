const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    registrationNumber:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    confirmPassword:{
        type: String,
        required: true
    }
});





const Register = new mongoose.model("register", studentSchema);

module.exports = Register;
