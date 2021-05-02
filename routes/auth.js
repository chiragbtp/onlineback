var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const {signout,signup,signin,isSignedIn} = require("../controllers/auth.js")


router.post("/signup",[
    check("name").isLength({ min: 5 }).withMessage('name must be at least 5 chars long'),
    check("email").isEmail().withMessage('email is requried'),
    check("password").isLength({min:3}).withMessage('password should be at least 3 character')

],signup);

router.post("/signin",[
    check("email").isEmail().withMessage('email is requried'),
    check("password").isLength({min:1}).withMessage('password is required')

],signin);

router.get("/signout",signout);



module.exports =router;