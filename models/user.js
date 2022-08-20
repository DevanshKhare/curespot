const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    }, 
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true, 
    },
    uid:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    diabetes:{
        type:String,
        required:true
    },
    bloodpressure:{
        type:String,
        required:true
    }
})
const User = mongoose.model('user',UserSchema)

module.exports = User;