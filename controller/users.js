// var express = require('express');
// var router = express.Router();
// var User = require('../models/users');
// var async = require("async"); 

// router.post("/signup",async (req,res)=>{
//     try{
//         let {
//             name,
//             email,
//             status,
//             password,
//         }=req.body;
//         if(!req.body.email){
//             return res.status(400).json({message:"Please enter valid email"})
//         }
//         if(!req.body.password){
//             return res.status(400).json({message:"Please enter password"})
//         }
//         User.add( name,email,status,password)
//         if(err){
//             return res.status(500).json({message:err})
//         }else{
//             return res.status(200).json({message:"data successfuly added",data:result})
//         }

//     }catch(err){
//         return res.status(500).json({message:err})
//     }
// })

// router.post("/login",(req, res)=>{
//     var email = req.body.email,
//     var password = req.body.password,


// })

const User = require('../models/users');
var bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            status,
        } = req.body
        const hashedPassword = await hashPassword(password);
        console.log(password)
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword, 
            status:status          
        });
        let response = new User(newUser)
        response.save()
        .then((result)=>{
            console.log(result,"SSS")
            res.json({statusCode:"200",statusMsj:"Successfuly Register", data:result})
        }).catch((err)=>{
            console.log(err)
            console.log("try again");
            res.send(err)
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password       
        } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password is not correct'))
        const accessToken = jwt.sign({
            userId: user._id
        }, 'bulbul', {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, {
            accessToken
        })
        res.send("login sucessful ")
    } catch (error) {
        console.log(error);
        res.send("login failed")
    }
}

exports.edit_profile =(req,res)=>{
    const {
        name,
        password,
        email,
        user_id,
        status
    }=req.body;
    User.updateOne({_id:user_id},
    {$set:{name:name, password: password, email:email, status:status}})
    .then(result =>{
        res.json({statusCode:"200",statusMsj:"Successfuly Update", data:result})
    }).catch(err =>{
        res.send(err)
    })
}

exports.delte_user = (req,res)=>{
    const {
        user_id
    }= req.body;
    User.deleteOne({_id:user_id})
    .then(result =>{
        res.send("delete successfuly")
    }).catch(err=>{
        res.send(err)
        console.log(err)
    })
    
}

