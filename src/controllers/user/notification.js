const Notification = require("../../model/user/notification");

const mongoose = require('mongoose')


const notifications = async(req,res) =>{
    try{
        const {id} = req.params

        const list = await Notification.find({userId : new mongoose.Types.ObjectId(id)})
        res.status(200).send(list)

    }catch(err){
        res.status(400).send(err)

    }
}



const allUserNotification = async(req,res) =>{
    try{

        const all = await Notification.find();
        res.status(200).send(all)

    }catch(err){
        res.status(400).send(err)

    }
}

const updateNotification = async(req,res) => {
    try{
        const { fileNum, attributeName } = req.body;
        console.log(fileNum,attributeName)

        if(!req.body){
            console.log('please enter valid details')
        }

        const updated = await Notification.findOneAndUpdate({ fileNum,attributeName },{ $set : { isOpen : true } })
        res.status(200).send(updated)
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports = {  allUserNotification, notifications,updateNotification}