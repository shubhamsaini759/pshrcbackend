const Deceased = require("../../model/user/deceased")
const mongoose = require('mongoose');
const RejectedFile = require("../../model/user/rejectedFiles");
const Notification = require("../../model/user/notification");


const createDeceased = async(req,res) =>{

    try{

        if(!req.body){
            throw new Error('please enter details')
        }
        
        const totalCount = await Deceased.count({});
        const fileNum = 100000 + totalCount + 1
        const { userId } = req.body

        const deceasedDetails = await new Deceased({...req.body,fileNum, userId : new mongoose.Types.ObjectId(userId) })

        await deceasedDetails.save();

        res.status(200).send(deceasedDetails)

    }catch(err){
        res.status(400).send(err)
    }
}


const updateDeceased = async(req,res) =>{
    try{
        const { fileNum, attributeName,newStatus,newMessage,userId,filePath,date} = req.body;

        if(!fileNum){
            throw new Error("provide a file number")
        }
        const { 
            tpm, 
            pmr, 
            ppr,
            medical,
            receivingDdr,
            Preliminary,
            receivingAndDispatch,
            dispatchDdr,
            chemical,
            histopathological,
            causeOfdDeath,
            Inquest,
            ordersOfPshrc,
            compilance,
            finalOrder,
           
        } = req.files;


        const clone = {};

        
        if(tpm?.[0]){
            clone['tpm'] = {
                filePath: tpm[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(pmr?.[0]){
            clone['pmr'] = {
                filePath: pmr[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(ppr?.[0]){
            clone['ppr'] = {
                filePath: ppr[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(medical?.[0]){
            clone['medical'] = {
                filePath: medical[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(receivingAndDispatch?.[0]){
            clone['medical'] = {
                filePath: receivingAndDispatch[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(receivingDdr?.[0]){
            clone['receivingDdr'] = {
                filePath: receivingDdr[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(Preliminary?.[0]){
            clone['Preliminary'] = {
                filePath: Preliminary[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(dispatchDdr?.[0]){
            clone['dispatchDdr'] = {
                filePath: dispatchDdr[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(chemical?.[0]){
            clone['chemical'] = {
                filePath: chemical[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(histopathological?.[0]){
            clone['histopathological'] = {
                filePath: histopathological[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(causeOfdDeath?.[0]){
            clone['causeOfdDeath'] = {
                filePath: causeOfdDeath[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(Inquest?.[0]){
            clone['Inquest'] = {
                filePath: Inquest[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(ordersOfPshrc?.[0]){
            clone['ordersOfPshrc'] = {
                filePath: ordersOfPshrc[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(compilance?.[0]){
            clone['compilance'] = {
                filePath: compilance[0].filename,dateTime: new Date(),status : 'pending'
            }
        }
        if(finalOrder?.[0]){
            clone['finalOrder'] = {
                filePath: finalOrder[0].filename,dateTime: new Date(),status : 'pending'
            }
        }

        const saved = await Deceased.findOne({fileNum})

        if(attributeName){
            clone[attributeName] = {
                ...saved[attributeName],
                ...clone[attributeName],
                message : newMessage,
                status : newStatus,
            }
        }
        
        const updated = await Deceased.findOneAndUpdate({ fileNum },{ ...req.body,...clone } )
    

        if(newStatus === "rejected"){
            await RejectedFile.create({
                fileNum : fileNum,
                attributeName : attributeName,
                message : newMessage,
                status : newStatus,
                date : new Date(),
                filePath : updated?.[attributeName]?.filePath,
            })
            await Notification.create({
                fileNum : fileNum,
                attributeName : attributeName,
                message : newMessage,
                status : newStatus,
                date : new Date(),
                filePath : updated?.[attributeName]?.filePath,
                userId : userId,
                isOpen : false
            })
        }

        res.status(200).send(updated)

    }catch(err){
        res.status(400).send(err)
    }
}

const allCases = async (req,res) =>{
    try{
        const list = await Deceased.find();
        res.status(200).send(list)

    }catch(err){
        res.status(400).send(err)

    
    }
}

const casedetails = async(req,res) =>{
    try{
        const {id} = req.params;

        if(!id){
            throw new Error('provide a valid file number')
        }

        // const details = await Deceased.findOne({ fileNum : id })

        const details = await Deceased.aggregate([
            {
                $match : { fileNum : id }
        
            },
            {
                $lookup : {
                    localField : 'userId',
                    foreignField : '_id',
                    from : 'users',
                    as : 'user',
                   
                }
            },
            {
                $set: {
                    user: {
                        $first: '$user'
                    },
                }
            }

        ])
        res.status(200).send(details.shift())

    }catch(err){
        res.status(400).send(err)
    }
}

const updateCase = async(req,res)=>{
    try{
        const {id} = req.params;
        const updated = await Deceased.findAndUpdate({ fileNum : id }, {...req.body})
        res.send(updated)

    }catch(err){
        res.send(err)
    }
}


const usercases = async (req,res) =>{
    try{

        const {id} = req.params;

        if(!id){
            throw new Error('provide a valid userId')
        }

        const list = await Deceased.find({ userId : new mongoose.Types.ObjectId(id)})
        res.status(200).send(list)


    }catch(err){
        res.status(400).send(err)
    }
}


const deleteFile = async(req,res) => {
    try{

        const { fileNum, attributeName } = req.body;

        const clone = {};

        if(attributeName){
            clone[attributeName] = {
                dateTime : "",
                status : "pending",
                filePath : "",
                message : ""
            }
        }
        const deletedFile = await Deceased.findOneAndUpdate({ fileNum }, {...clone} )
        res.status(200).send(deletedFile)

    }catch(err){
        res.status(400).send(err)

    }
}


const rejectedData = async(req,res) =>{
    try{

        const { fileNum, attributeName } = req.body;
        

        const details = await RejectedFile.find({fileNum,attributeName})
        
        res.status(200).send(details)

    }catch(err){
        res.status(400).send(err)

    }
}

const filterCase = async(req,res) =>{
    try{

  

        if(!req.query){
            throw new Error('please provide valid details')
        }

        const filteredData = await Deceased.find(req.query)
                            
        res.status(200).send(filteredData)

    }catch(err){
        res.status(400).send(err)
    }
}


const filterUsercase = async(req,res) =>{
    try{

        const { userId, fileNum,deceasedName,incidentPlace} = req.body

        if(!req.body){
            throw new Error('please provide valid info')
        }
        const query = { userId }

        if (deceasedName) {
            query.deceasedName = deceasedName;
        }
        if (fileNum) {
            query.fileNum = fileNum;
        }
        if (incidentPlace) {
            query.incidentPlace = incidentPlace;
        }

        const filtered = await Deceased.find(query)

       res.send(filtered)

    }catch(err){
        res.status(400).send(err)
    }
}


module.exports = { createDeceased, updateDeceased, allCases, casedetails, usercases,deleteFile, rejectedData, filterCase, filterUsercase, updateCase }