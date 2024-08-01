const express=require('express');
const app=express();
const path=require('path');
const {connectToMongoDB}=require('./connection');
const URL=require('./models/url');
const cookieparser=require('cookie-parser');
const { checkForAuthentication, restrictTo}=require('./middlewares/auth');   
const port=3000;
//Routes
const urlRoute=require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');
// const {checkAuth}=require('./middlewares/auth');
//connection
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>{
    console.log('Connected to MongoDB');
});

//important middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthentication);
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

//checking route
app.use('/url',restrictTo(["NORMAL"]),urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);

//redirect-route
app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    console.log(shortId);
    const entry=await URL.findOneAndUpdate({shortId},{$push:{visitHistory:{timestamp:Date.now()}}});
    console.log(entry.redirectURL);

    
    res.redirect("https://"+entry.redirectURL);
})

///listening to port
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});