const mongoose = require('mongoose')


const deceasedSchema = new mongoose.Schema({
    deceasedName : {
        type : String
    },
    incidentDate : {
        type : Date
    },
    incidentDetails : {
        type : String
    },
    incidentPlace : {
        type : String
    },
    fileNum : {
        type : String
    },
    userId : {
        type : mongoose.Types.ObjectId
    },
    gender : String,
    tpm :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String
    },
    pmr :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    ppr :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    medical :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    receivingAndDispatch :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    Preliminary :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    receivingDdr :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    dispatchDdr :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    chemical :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    histopathological :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    causeOfdDeath :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    Inquest :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
    },
    ordersOfPshrc :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
    },
    compilance :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
        message : String

    },
    finalOrder :{
        dateTime : Date,
        status : {
            type :String,
            enum : [ 'pending', 'approved', 'rejected' ],
            default : 'pending'
        },
        filePath : String,
    },
})


const Deceased = new mongoose.model('deceased',deceasedSchema)

module.exports = Deceased