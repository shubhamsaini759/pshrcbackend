const express = require('express');
const {  allUserNotification, notifications, updateNotification } = require('../../controllers/user/notification');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();


router.get('/allUserNotification',verifyToken,allUserNotification)
router.get('/notifications/:id',verifyToken,notifications)
router.put('/updateNotification',verifyToken,updateNotification)




module.exports = router