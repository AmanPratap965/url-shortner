// const {v4: uuidv4} = require('uuid');
const User=require('../models/user');
const {setUser}=require('./../service/auth');   

async function handleUserSignup(req,res){
    const {name,email,password}=req.body;
   const result=await User.create({name,email,password});
    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const {email,password}=req.body;
   const user=await User.findOne({email,password});
   console.log(user);
   if(!user)return res.render('login',{error:"Invalid email or password"});
//    const sessionId=uuidv4();
   const token=setUser(user);
   res.cookie("token",token);
    // res.header("authorization",`Bearer ${token}`);
    return res.redirect("/");
}

module.exports={handleUserSignup,handleUserLogin};