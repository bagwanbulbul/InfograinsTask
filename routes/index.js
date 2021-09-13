// 


const express = require('express');
var user = express.Router();
user.use(express.json())
const bodyParser = require("body-parser")

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const {signup,
    login,
    edit_profile,delte_user
} = require('../controller/users')
router.post("/signup",signup )
router.post("/login",login)
router.put("/updateOne",edit_profile)
router.delete("/delte_user",delte_user)
module.exports = router
