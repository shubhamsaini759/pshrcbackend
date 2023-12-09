const User = require("../../model/admin/User");
const mongoose = require('mongoose')
const OTP = require("../../model/admin/opt");


// for otp
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const moment = require('moment');

// for jwt 
const jwt = require('jsonwebtoken')
const secret_Key = "jsonwebtokensecretkey"



// create admin and user

const createUser = async(req,res) =>{
    try{
        const userDetails = req.body;
        const image = req.file.filename;

        if(!userDetails){
            throw new Error('please enter all details')
            return
        }

        
        const saveUser = new User({image,...req.body});
        await saveUser.save()

        res.status(200).send(saveUser)

        
    }catch(err){
        res.status(400).send(err)
    }
}


const login = async(req,res) =>{

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'niteshnkpl@gmail.com',
            pass: 'bfhvmuwikshzhweq'
        },
        secure : true
      });

    try{

        const { email, password } = req.body;

        const userDetails = await User.findOne({ email });

        if( !userDetails){
            throw new Error('please provide valid informations')
            return
        }
        if(userDetails.password !== password ){
            throw new Error('please provide valid informations')
            return
        }
    
        if(userDetails.password === password ){

            const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
            const expirationTime = moment().add(5, 'minutes');
          
            const newOtp = new OTP({
              email,
              otp,
              expirationTime,
            });
          
            await newOtp.save();

            const mailOptions = {
                from: 'niteshnkpl@gmail.com',
                to: email, 
                subject: 'otp-code',
                text: `Your OTP code is: ${otp}`,
            };


            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(500).json({ error: 'Failed to send OTP via email.' });
                } else {
                //   console.log('Email sent: ' + info.response);
                  res.json({ message: 'OTP generated and sent via email.' });
                }
            });
        }   
    }catch(err){
        res.status(400).send(err)
    }
}



const veriFyAccount = async(req,res) =>{
    try{
        const { email, otp } = req.body

        const  savedOtp = await OTP.findOne({email, otp,  expirationTime: { $gt: new Date() }})

        if(!savedOtp){
            res.status(400).send('otp expired')
            return
        }
        const userDetails = await User.findOne({email})
        
        const token =  jwt.sign({email},secret_Key,{ expiresIn: '15m' })
        return res.status(200).send({ user: userDetails, auth : token })  

    }catch(err){
        res.status(400).send(err)
    }
}



const userList = async(req,res) =>{
    try{

        const userList = await User.find({ name : { $ne : 'admin'} });

        res.status(200).send(userList)

    }catch(err){
        res.status(400).send(err)
        console.log(err)
    }
}

const userDetails = async(req,res) =>{
    try{

        const { id } = req.params;

        if(!id){
            throw new Error('please provide a valid userId')
        }

        const userDetails = await User.findOne({ _id : new mongoose.Types.ObjectId(id) })
        res.status(200).send(userDetails)

    }catch{
        res.status(400).send(err)
    }
}

const updateUser = async(res,send) => {
    try{

        const {id} = req.params;

        if(!id){
            throw new Error('please provide a valid userId')
        }
        
        const updated = await User.findByIdAndUpdate({ userId : new mongoose.Types.ObjectId(id) },{...req.body})
        res.status(200).send(updated)

    }catch(err){
        res.status(400).send(err)
    }
}

const deleteUser = async(req,res) =>{
    try{
        const { id} = req.params;

        if(!id){
            throw new Error('please provide a valid userId ')
        }

        const deletedUser = await User.deleteOne({ _id : new mongoose.Types.ObjectId(id) })
        res.status(200).send(deletedUser)
        
    }catch(err){
        res.status(400).send(err)
    }
}


const filterUser = async(req,res) =>{
    try{
        const { name } = req.body;
        if(!req.params){
            throw new Error('please provide valid details')
        }
        const filtered = await User.find({ name : {$in : name }})
        res.status(200).send(filtered)

    }catch(err){
        res.send(err)
        console.log(err)
    }
}




module.exports = { createUser, userList, userDetails, updateUser, deleteUser, login, veriFyAccount, filterUser }