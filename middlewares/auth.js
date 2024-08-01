const {getUser}=require("../service/auth");

//Authentication middleware
function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null;
    if(!tokenCookie )return next();
    const token=tokenCookie;
    const user=getUser(token);
    req.user=user;
    return next();

}
//Authorization middleware
function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user)return res.redirect('/login');
        if(!roles.includes(req.user.role))return res.send('unAuthorized');
        next();
    }
}

// async function restrictToLoggedinUserOnly(req,res,next){
//     const uid=req.headers["authorization"];
//     console.log(req.headers);
//     if(!uid)return res.redirect('/login');
//     const token=uid.split("Bearer ")[1];
//     const user=getUser(token);
//     if(!user)return res.redirect('/login');
//     req.user=user;
//     next();
// }

// async function checkAuth(req,res,next){
//     console.log(req.headers);
//     const userUid=req.headers["authorization"];
//     const token=userUid.split("Bearer ")[1];
//     const user=getUser(token);

//     req.user=user;
//     next();

// }

module.exports={checkForAuthentication,restrictTo};