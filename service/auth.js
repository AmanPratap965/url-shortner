const jwt=require('jsonwebtoken');
const secret='mysecret';
function setUser(user){
    payload={_id:user._id,email:user.email,role:user.role};
    return jwt.sign(payload,secret);
}

function getUser(token){
    if(!token)return null;
    try{
        return jwt.verify(token,secret);

    }catch(err){
        return null;
    }
}


module.exports={setUser,getUser};