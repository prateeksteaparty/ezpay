const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { JWT_SECRET } = require('../config');
const router = express.Router();
const { User, Account } = require("../database");
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');


//setting up middlewares for routes
const signupSchema = zod.object({
    username : zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})


router.post('/signup', async (req, res ) =>{
    const body = req.body; //get body of the inputs
    const {success} = signupSchema.safeParse(req.body); //safeParse the body with zod validation
    if(!success){  //if success is not true i mean req.body will give back a json object hence we put success in {} and 
        //if !success means false then it returns msg that email is already taken with status code 411
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = User.findOne({
        username: body.username  //checks if there is a existing user with the given name
    })

    if(existingUser) { //if existing user is true then it says email already taken
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,   //here the user is created by taking its username blah blah
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({
        userId: user._id  // the user created is stored in user as a object a id is 
        // created of that object
        // that id is called as user id and its given for jwt to create a jwt token
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token   // creates user and returns token related to corresponding id and pass
    })
})


router.post('/signin', (req, res) =>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "Incorrect Inputs"
        })
    } // checks if it passes middleware checks i.e zod or input validation checks

    const user = User.findOne({
        username: req.body.username,
        password: req.body.password //finds user 
    })
    if(user){
        const token = jwt.sign({
            userId: user._id   //once user is found a token is created with that id
        }, JWT_SECRET)

        res.json({
            token: token
        }) // token is given back 
        return;
    }else{
        res.status(411).json({
            message: "Error Signing in"
        }) //if user not found then error signing in
    }
})



// below part is new consider it as a chat gpt code will understand soon
// was trying to do that auto finding keyword thing usually machine learning 
// should be use but this is a good start for that, isn't it ? 
router.put('/', authMiddleware, async (req, res) =>{
    const { success } = updateBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body , {
        id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })
})

router.get('/bulk', async (req, res) =>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            },
             lastName: {
                    "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user=> ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

// finds account and returns balance
router.get('/balance', authMiddleware, async (req, res)=>{
    const account = Account.findOne({
        userId: req.userId //finds account
    });
    res.json({
        balance: account.balance //gives back balance
    })
});

router.post('/transfer', authMiddleware, async(req, res)=>{
    const session = mongoose.startSession(); //starts a session

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