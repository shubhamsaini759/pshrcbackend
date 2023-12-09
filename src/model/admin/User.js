const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type  : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone :{
        type : String
    },
    password : {
        type : String,
        required : true
    },
    jailAddress : {
        type : String
    },
    pincode : {
        type : String
    },
   
    image : String,
    fileId : [{
        type : mongoose.Types.ObjectId
    }]
})

const User = new mongoose.model('user',userSchema)
module.exports = User