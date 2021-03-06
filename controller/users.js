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
            
        } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword          
        });

        var userData = await User.find({email:req.body.email})
        console.log(userData)
        if(userData.length >0){
            return res.json({statusCode: 400, message: "Email alerady exist"})
        }

        let response = new User(newUser)
        response.save()
        .then((result)=>{
            res.json({statusCode:"200",statusMsj:"Successfuly Register", data:result})
        }).catch((err)=>{
            console.log(err);
            return res.send(err);
        })
    } catch (error) {
        console.log(error);
        return res.send(error);
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
        console.log(accessToken)
        return res.json({message:"login sucessful", accessToken:accessToken})
    } catch (error) {
        console.log(error);
        return res.json({statusCode:403,message:"login failed"})
    }
}

exports.view_profile =(req,res)=>{
    const user_id = req.query.user_id
    User.find({_id:user_id}).then(result=>{
        return res.json({statusCode:200, data:result})
    }).catch(err=>{
       return res.send(err)
    })
}

exports.edit_profile =(req,res)=>{
    const {
        name,
        password,
        email,
        user_id,
    }=req.body;
    User.updateOne({_id:user_id},
    {$set:{name:name, password: password, email:email}})
    .then(result =>{
       return res.json({statusCode:"200",statusMsj:"Successfuly Update", data:result})
    }).catch(err =>{
       return res.send(err)
    })
}




