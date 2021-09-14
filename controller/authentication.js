const User = require("../models/users");
const jwt = require('express-jwt');



exports.isBlockAdmin = async (req, res, next) => {
    const all = req.body.email
    const u_list = await User.findOne({
        email: all
    })
    console.log(u_list);
    if (u_list.role == 1) {
        next();
    } else {
       return res.json({code:400,msg:"you are not authenticate for admin"});
    }
}

exports.isAdmin = async (req, res, next) => {
    const all = req.params.user_id
    const u_list = await User.findOne({
        _id: all
    })
    console.log(u_list);
    if (u_list.role == 1) {
        next();
    } else {
       return res.json({code:400,msg:"you are not authenticate for admin"});
    }
}
