const mongoose = require('mongoose')


const rejectedFilesSchema = new mongoose.Schema({
    fileNum : String,
    attributeName : String,
    date : Date,
    status : {
        type :String,
        enum : [ 'rejected' ],
    },
    filePath : String,
    message : String
})

const RejectedFile = new mongoose.model('RejectedFile',rejectedFilesSchema)
module.exports = RejectedFile