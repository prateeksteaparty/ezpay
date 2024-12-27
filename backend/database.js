const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pratik2271:pratik%401624@pratikproject.vglse6e.mongodb.net/ezpay');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password : {
        type: String,
        required: true,
        minLength: 8
    },
    firstName : {
        type: String,
        required :true,
        trim: true,
        maxLength: 50
    },
    lastName : {
        type: String,
        required : true,
        trim: true,
        maxLength : 50
    }
})


const accountSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    balance:{
        type: Number,
        required: true
    } 
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
}