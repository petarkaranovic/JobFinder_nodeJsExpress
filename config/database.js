const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('codegig', 'root','',{
    host:'localhost',
    dialect:'mariadb',

    dialectOptions:{
        timezone:process.env.db_timezone
    },

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});