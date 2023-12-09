const express = require('express');
const { createUser, userList, userDetails, updateUser, deleteUser, login, veriFyAccount, filterUser } = require('../../controllers/admin/User');
const uploader = require('../../middleware/uploader');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();


router.post('/createuser',verifyToken,uploader.single('image'),createUser)
router.get('/userlist',verifyToken,userList)
router.get('/userdetails/:id',verifyToken,userDetails)
router.post('/filterUser',filterUser)
router.put('/updateuser/:id',verifyToken,updateUser)
router.delete('/deleteuser/:id',verifyToken,deleteUser)
router.post('/login',login)
router.post('/veriFyAccount',veriFyAccount)

module.exports = router