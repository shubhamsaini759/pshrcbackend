const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    fileNum : String,
    attributeName : String,
    date : Date,
    status : {
        type :String,
        enum : [ 'rejected' ],
    },
    message : String ,
    isOpen : {
        type : Boolean,
        default : false
    },
    userId :{
        type : mongoose.Types.ObjectId
    }
})

const Notification = new mongoose.model('notification', notificationSchema)
module.exports = Notification;