const db = require('sequelize')

const datab =  new db.Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD,{
    host: process.env.HOST,
    dialect:'postgres',
    logging:false,
    port:process.env.PORTDB
})




module.exports = datab

