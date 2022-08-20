const mongoose = require('mongoose')
const { Schema } = mongoose;

const DoctorSchema = new Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const Doctor = mongoose.model('doctor',DoctorSchema)

module.exports = Doctor