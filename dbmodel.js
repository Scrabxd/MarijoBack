const db = require('sequelize')

const datab =  new db.Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD,{
    host: process.env.HOST,
    dialect:'postgres',
    logging:false,
    ssl:true,
    port:process.env.PORTDB,
    dialectOptions: {
        ssl: {
          require: true, // Require SSL
          rejectUnauthorized: false // Disables rejection of self-signed SSL certificates
        }
    }
})




module.exports = datab

