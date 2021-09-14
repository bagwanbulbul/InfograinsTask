
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
        default:false
	},
    role:{
        type: Number,
        default:0
    }    
    
}, { strict: false });
var detail = mongoose.model("Users", Users)
module.exports = detail