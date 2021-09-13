// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;



const mongoose = require("mongoose")
const schema = mongoose.Schema
const Users = new schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        default: ''
    },
	status:{
		type:Boolean,
	},
    role:{
        type: Number
    }    
    
}, { strict: false });
var detail = mongoose.model("Users", Users)
module.exports = detail