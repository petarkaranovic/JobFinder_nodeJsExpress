const express = require('express');
const router = express.Router();
const db=require('../config/database');
const Job=require('../models/Job');

// get job list
async function fetchJobs(){
    try{
        router.get('/', (req,res)=>{
            var jobs = Job.findAll();
            res.render('jobs',{
                jobs
            });
        })
    } catch(err){
        console.log(error);
    }
}
fetchJobs();

// manually adding a job!
async function addJob(){
    try{
        router.get('/add', (req,res)=>{
        const data = {
        title:'Last try',
        technologies:'canva',
        budget:'$999',
        description:' aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        contact_email:'user4@gmail.com'
            }
        let{title,technologies,budget,description,contact_email} = data;
        Job.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        })
        res.redirect("/jobs");
        })
    } catch (err){
        console.log(err)
    }
}
addJob();


module.exports=router;