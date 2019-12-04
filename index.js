const express=require('express');
// const routes=require('./routes');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.json({test:'test'});
});

module.exports ={ router };