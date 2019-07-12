const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// testing the database connection
const db=require('./config/database');

async function test(){
    try{
        await db.authenticate();
        console.log('Connection to the server made succesfully');
    } catch (err){
        console.log(err);
    }
}
test();
const app=express();

// adding the handlebars

app.engine('handlebars',exphbs({defaultLayout:'main'}));


// setting the index route
app.get('/', (req,res)=> res.send('INDEX'));

// gig routes:

app.use('/jobs', require('./routes/jobs'));

// setting up the port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`)); 

