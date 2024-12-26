const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { JWT_SECRET } = require('../config');
const router = express.Router();
const { User } = require("../database")

const signupSchema = zod.object({
    username : zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    username: zod.string.email(),
    password: zod.string()
})

router.post('/signup', async (req, res ) =>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = User.findOne({
        username: body.username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
})


router.post('/signin', (req, res) =>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "Incorrect Inputs"
        })
    }

    const user = User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            token: token
        })
        return;
    }else{
        res.status(411).json({
            message: "Error Signing in"
        })
    }



})



module.exports = router;