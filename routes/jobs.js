const express = require('express');
const router = express.Router();
const db=require('../config/database');
const Job=require('../models/Job');
// bringing the OP method for search
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get job list
// async function fetchJobs(){
//     try{
//         router.get('/', (req,res)=>{
//             var jobs = Job.findAll();
//             res.render('jobs',{
//                 jobs
//             });
//         })
//     } catch(err){
//         console.log(error);
//     }
// }
// fetchJobs();

router.get("/", (req, res) => {
  Job.findAll()
    .then(jobs => {
      res.render("jobs", {
        jobs
      });
    })
    .catch(err => console.log(err));
});
// display add job form:

router.get('/add', (req,res)=>
    res.render('add'));

// manually adding a job!
// async function addJob(){
//     try{
//         router.post('/add', (req,res)=>{    
//         let{title,technologies,budget,description,contact_email} = req.body;
//         // field validation
//         let errors =[];
//         if(!title){
//             errors.push({text:'Please add a title'})
//         }
//         if (!technologies) {
//             errors.push({ text: "Please add technologies that are requested for this job" });
//         }
//         if (!description) {
//             errors.push({ text: "Please add a description" });
//         }
//         if (!contact_email) {
//           errors.push({ text: "Please add a contact email" });
//         }

//         //  check for errors 
//         if(errors.length>0){
//             res.render("add", {
//               errors,
//               title,
//               technologies,
//               budget,
//               description,
//               contact_email
//             });
//         } else {
//           Job.create({
//           title,
//           technologies,
//           budget,
//           description,
//           contact_email
//         });
//         }

//         res.redirect("/jobs");
//         })
//     } catch (err){
//         console.log(err)
//     }
// }
// addJob();

router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  // validating fields
  let errors = [];

  if (!title) {
    errors.push({ text: "Please add a title." });
  }
  if (!technologies) {
    errors.push({ text: "Please add technologies." });
  }
  if (!description) {
    errors.push({ text: "Please add a description." });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email." });
  }

  // check for errors:

  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }
    // Make lower case
    technologies=technologies.toLowerCase();

    // inserting into a table:
    Job.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then(job => res.redirect("/jobs"))
      .catch(err => console.log(err));
  }
});

// Search for jobs.

router.get('/search', (req,res)=>{
    const {term} = req.query;

    Job.findAll({where: {technologies: {[Op.like]:'%'+term+'%'}}})
       .then(jobs=>res.render('jobs',{jobs}))
       .catch(err=>console.log(err));
})

module.exports=router;