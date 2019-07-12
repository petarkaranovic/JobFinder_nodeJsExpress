const express = require('express');
const router = express.Router();
const db=require('../config/database');
const Job=require('../models/Job');

async function fetchJobs(){
    try{
        router.get('/', (req,res)=>{
            var jobs = Job.findAll();
            console.log(jobs);
            res.sendStatus(200);
        })
    } catch(err){
        console.log(error);
    }
}
fetchJobs();


module.exports=router;