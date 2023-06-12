const express = require("express");
const router = express.Router();
const signup_con  = require('../controller/signup')
const login_con = require('../controller/login');
const auth  = require('../middleware/auth');
router.post('/signup',signup_con.signup)
router.get('',(req,res)=>{
  res.json({'data':"harpreet"});
})
router.get('/login',login_con.login);
router.get('/auth',auth.verify)
module.exports = router;