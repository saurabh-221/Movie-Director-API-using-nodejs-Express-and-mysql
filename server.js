const express=require('express');
const db=require('../db')
const router=express.Router();
const apiRouter=router.get('/',async(req,res,next)=>{
    try{
        let results=await db.all();
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
// const apiRouter=require('./index.js');
const app=express();
app.use(express.json());
app.use('/api/chirps',apiRouter);
const PORT=8080 
app.listen(PORT,()=>{
    console.log("Server is running on port 8080");
});