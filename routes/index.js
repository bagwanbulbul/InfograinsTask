
const express = require('express');
var user = express.Router();
user.use(express.json());
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const {signup, login, edit_profile,view_profile
} = require('../controller/users');
router.post("/signup",signup );
router.post("/login",login);
router.put("/edit_profile",edit_profile);
router.get("/view_profile",view_profile);


module.exports = router
