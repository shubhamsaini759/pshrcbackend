const express = require('express');
const { createDeceased, updateDeceased, allCases, casedetails, usercases, deleteFile, rejectedData, noti, filterCase, filterUsercase, updateCase } = require('../../controllers/user/deceased');
const uploader = require('../../middleware/uploader');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/createdeceased',verifyToken,createDeceased)
router.put('/updatedeceased',verifyToken,uploader.fields([
    {
        name : 'tpm',maxCount : 1
    },
    {
        name : 'pmr',maxCount : 1
    },
    {
        name : 'ppr',maxCount : 1
    },
    {
        name : 'medical',maxCount : 1
    },
    {
        name : 'Preliminary',maxCount : 1
    },
    {
        name : 'receivingAndDispatch',maxCount : 1
    },
    {
        name : 'receivingDdr',maxCount : 1
    },
    {
        name : 'dispatchDdr',maxCount : 1
    },
    {
        name : 'chemical',maxCount : 1
    },
    {
        name : 'histopathological',maxCount : 1
    },
    {
        name : 'causeOfdDeath',maxCount : 1
    },
    {
        name : 'Inquest',maxCount : 1
    },
    {
        name : 'ordersOfPshrc',maxCount : 1
    },
    {
        name : 'compilance',maxCount : 1
    },
    {
        name : 'finalOrder',maxCount : 1
    },
]) ,updateDeceased)

router.get('/deceasedlist',verifyToken,allCases)
router.get('/casedetails/:id',verifyToken,casedetails)
router.get('/usercases/:id',verifyToken,usercases)
router.put('/deleteFile',verifyToken,deleteFile)
router.post('/rejectedData',verifyToken,rejectedData)
router.post('/filterCase',filterCase)
router.post('/filterUsercase',filterUsercase)
router.put('/updateCase/:id',updateCase)


module.exports = router