const express = require('express');
var user = express.Router();
user.use(express.json());
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

const {isBlockAdmin,isAdmin}=require("../controller/authentication");

const {adminSignup,adminlogin,admin_edit_profile,user_list,user_details,delete_user, status_manage}
=require('../controller/admin');
router.post("/signup",adminSignup);
router.post("/login",isBlockAdmin,adminlogin)
router.get("/user_list/:user_id",isAdmin,user_list);
router.put("/edit_profile/:user_id",isAdmin,admin_edit_profile);
router.get("/user_details/:user_id",isAdmin,user_details);
router.delete("/delete_user/:user_id",isAdmin,delete_user);
router.put("/status_manage/:user_id",isAdmin,status_manage);


module.exports = router;