const express = require('express');
const { authMiddleware } = require('../middleware');
const {Account} = require('../database');
const {default: mongoose} = require('mongoose');

const router = express.Router();


// finds account and returns balance
router.get('/balance', authMiddleware, async (req, res)=>{
    const account = await Account.findOne({
        userId: req.userId //finds account
    });

    res.json({
        balance: account.balance //gives back balance
    })
});

router.post('/transfer', authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession(); //starts a session

    session.startTransaction(); //starts a transaction inside a session 

    const { amount, to } = req.body; // gets input as amount and to whom u wanna send from req.body

    const account = await Account.findOne({userId: req.userId}).session(session); //finds the account of the user who wants 
    // to send money

    if(!account || account.balance < amount){ // if account doesnt exist or balance is low give insufficient balance
        await session.abortTransaction();// abort transaction if account doesnt exist
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
     // if account exists then find the account of whom u wanna send money to
    if(!toAccount){
        await session.abortTransaction(); // abort transaction if account doesnt exist
        return res.status(400).json({
            message: "Invalid account" //if account doesnt exist give back invalid account
        })
    } 
    // P.S: Checked with a function when two transaction are sent together they conflict

    await Account.updateOne({userId: req.userId}, {$inc : {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);
   // here the transaction is done 
    await session.commitTransaction(); // commit transaction
    res.json({
        message: "Transfer Successfull" // give back message of transfer successful
    });

})


module.exports = router;

