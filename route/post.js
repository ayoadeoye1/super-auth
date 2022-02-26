import express from "express";
import usrPost from "model/post.js";
import midWare from "../middlewares/protectedResource.js";

const router = express.Router();


router.post("/createpost", midWare, async (req, res) =>{
    const {title, body} = req.body;
    if (!title || !body){
        return res.status.json({error: "title and body is mandatory"});
    }
    try{
    const post = new usrPost({title, body, author: req.dbUser._id});
    const npost = await post.save()
    res.status(201).json({npost});
    }catch (error){
        console.log(error);
    }    
})

router.get("/posts", (req, res)=>{
    const allPosts = await usrPost.find()
    res.status(201).json({posts: allPosts});
})