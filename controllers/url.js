// Description: This file contains the logic for generating a new short URL.
const URL=require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewShortURL(req,res){
        const shortId=shortid();
        const redirectURL=req.body.url;
        if(!redirectURL){
            return res.status(400).json({message:'redirectURL is required'});
        }
        await URL.create({
            shortId:shortId,
            redirectURL:redirectURL,
            visitHistory:[],
            createdBy:req.user._id,
        })
        return res.status(201).render("index",{shortId:shortId}); 
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    // console.log(shortId);
    if(!result)return res.status(404).json({message:"Enter valid shortId"})
    return res.json({totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    });
}
module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}